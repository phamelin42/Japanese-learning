import { describe, expect, it } from 'vitest';
import type { ProgressDocument } from '../../src/app/progress/progress.model';
import { handleProgress, type ProgressStorage } from './progress-handler';

const SECRET = 'une phrase secrète';
const URL = 'https://japanese-learning.phamelin.fr/api/progress';

function memoryStorage(initial: unknown = null): ProgressStorage & { value: unknown } {
  const storage = {
    value: initial,
    async get() {
      return storage.value;
    },
    async set(document: ProgressDocument) {
      storage.value = structuredClone(document);
    },
  };
  return storage;
}

const failingStorage: ProgressStorage = {
  get: () => Promise.reject(new Error('Redis injoignable')),
  set: () => Promise.reject(new Error('Redis injoignable')),
};

function doc(updatedAt: string, sessions = 1): ProgressDocument {
  return {
    version: 1,
    modules: {
      'jours-de-la-semaine': {
        done: false,
        doneAt: null,
        sessions,
        bestFirstTry: null,
        lastPracticedAt: null,
        updatedAt,
      },
    },
  };
}

function request(method: string, init: { secret?: string | null; body?: string } = {}): Request {
  const headers = new Headers();
  const secret = init.secret === undefined ? SECRET : init.secret;
  if (secret !== null) headers.set('Authorization', `Bearer ${secret}`);
  return new Request(URL, { method, headers, body: init.body });
}

const call = (req: Request, storage: ProgressStorage = memoryStorage(), secret = SECRET) =>
  handleProgress(req, { storage: () => storage, secret });

describe('/api/progress', () => {
  it('refuse une requête sans code (401)', async () => {
    const response = await call(request('GET', { secret: null }));
    expect(response.status).toBe(401);
  });

  it('refuse un code faux, même presque bon (401)', async () => {
    expect((await call(request('GET', { secret: 'une phrase secrèt' }))).status).toBe(401);
    expect((await call(request('GET', { secret: 'Une phrase secrète' }))).status).toBe(401);
  });

  it('renvoie une progression vide tant que rien n’est enregistré', async () => {
    const response = await call(request('GET'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ version: 1, modules: {} });
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('enregistre un document puis le relit', async () => {
    const storage = memoryStorage();
    const saved = doc('2026-10-30T10:00:00.000Z');
    const put = await call(request('PUT', { body: JSON.stringify(saved) }), storage);
    expect(put.status).toBe(200);
    expect(await (await call(request('GET'), storage)).json()).toEqual(saved);
  });

  it('ne laisse pas un document plus ancien écraser une version plus récente', async () => {
    const storage = memoryStorage(doc('2026-10-30T12:00:00.000Z', 5));
    const response = await call(
      request('PUT', { body: JSON.stringify(doc('2026-10-30T10:00:00.000Z', 1)) }),
      storage,
    );
    expect(await response.json()).toEqual(doc('2026-10-30T12:00:00.000Z', 5));
    expect(storage.value).toEqual(doc('2026-10-30T12:00:00.000Z', 5));
  });

  it('refuse un corps de plus de 64 Ko sans rien écrire (400)', async () => {
    const storage = memoryStorage();
    const body = JSON.stringify({ ...doc('2026-10-30T10:00:00.000Z'), pad: 'x'.repeat(70_000) });
    const response = await call(request('PUT', { body }), storage);
    expect(response.status).toBe(400);
    expect(storage.value).toBeNull();
  });

  it.each(['', '{', '{"version":2,"modules":{}}', 'null'])(
    'refuse le corps invalide « %s » sans rien écrire (400)',
    async (body) => {
      const storage = memoryStorage();
      expect((await call(request('PUT', { body }), storage)).status).toBe(400);
      expect(storage.value).toBeNull();
    },
  );

  it('ignore un document stocké corrompu et repart d’une progression vide', async () => {
    const response = await call(request('GET'), memoryStorage({ version: 'x' }));
    expect(await response.json()).toEqual({ version: 1, modules: {} });
  });

  it('répond 503 avec Retry-After quand le stockage est injoignable', async () => {
    const response = await call(request('GET'), failingStorage);
    expect(response.status).toBe(503);
    expect(response.headers.get('Retry-After')).toBe('60');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('répond 503 quand le code n’est pas configuré sur le serveur', async () => {
    const response = await handleProgress(request('GET'), {
      storage: () => memoryStorage(),
      secret: undefined,
    });
    expect(response.status).toBe(503);
  });

  it('répond 503 quand le stockage n’est pas configuré', async () => {
    const response = await handleProgress(request('GET'), {
      storage: () => null,
      secret: SECRET,
    });
    expect(response.status).toBe(503);
  });

  it('refuse les autres méthodes (405)', async () => {
    const response = await call(request('DELETE'));
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('GET, PUT');
  });
});
