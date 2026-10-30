import { createHash, timingSafeEqual } from 'node:crypto';
import { mergeProgress } from '../../src/app/progress/merge-progress';
import {
  emptyProgress,
  MAX_PROGRESS_BYTES,
  parseProgress,
  parseProgressJson,
  type ProgressDocument,
} from '../../src/app/progress/progress.model';

export interface ProgressStorage {
  get(): Promise<unknown>;
  set(document: ProgressDocument): Promise<void>;
}

export interface ProgressDeps {
  /** `null` quand le stockage n'est pas configuré (variables d'environnement absentes). */
  storage: () => ProgressStorage | null;
  secret: string | undefined;
}

const NO_STORE = { 'Cache-Control': 'no-store' };

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...NO_STORE, ...headers },
  });
}

const unavailable = (reason: string) => {
  console.error(`/api/progress indisponible : ${reason}`);
  return json(503, { error: 'indisponible' }, { 'Retry-After': '60' });
};

const digest = (text: string) => createHash('sha256').update(text).digest();

/** Comparaison en temps constant, sur des empreintes de même longueur. */
function isAuthorized(request: Request, secret: string): boolean {
  const header = request.headers.get('Authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  return token !== '' && timingSafeEqual(digest(token), digest(secret));
}

/** Lit le corps en s'arrêtant dès qu'il dépasse la limite ; `null` s'il est trop gros. */
async function readBounded(request: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get('Content-Length') ?? 0);
  if (declared > maxBytes) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

/**
 * GET : progression enregistrée (vide si rien ou si corrompue). PUT : fusionne le document reçu
 * avec l'existant (la version la plus récente de chaque module l'emporte) et renvoie le résultat.
 */
export async function handleProgress(request: Request, deps: ProgressDeps): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'PUT') {
    return json(405, { error: 'méthode non permise' }, { Allow: 'GET, PUT' });
  }
  if (!deps.secret) return unavailable('PROGRESS_SECRET absent');
  if (!isAuthorized(request, deps.secret)) return json(401, { error: 'code refusé' });
  const storage = deps.storage();
  if (!storage) return unavailable('stockage Redis non configuré');

  let incoming: ProgressDocument | null = null;
  if (request.method === 'PUT') {
    const text = await readBounded(request, MAX_PROGRESS_BYTES);
    incoming = text === null ? null : parseProgressJson(text);
    if (!incoming) return json(400, { error: 'document invalide' });
  }

  try {
    const stored = parseProgress(await storage.get()) ?? emptyProgress();
    if (!incoming) return json(200, stored);
    const merged = mergeProgress(incoming, stored);
    await storage.set(merged);
    return json(200, merged);
  } catch (error) {
    return unavailable(error instanceof Error ? error.message : String(error));
  }
}
