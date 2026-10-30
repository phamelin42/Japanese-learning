// Partagé avec la fonction serveur `api/progress.ts` : aucune dépendance (ni Angular, ni import).

export interface FirstTryScore {
  right: number;
  total: number;
}

export interface ModuleProgress {
  done: boolean;
  doneAt: string | null;
  sessions: number;
  bestFirstTry: FirstTryScore | null;
  lastPracticedAt: string | null;
  /** Instant ISO de la dernière modification : la plus récente l'emporte à la fusion. */
  updatedAt: string;
}

export interface ProgressDocument {
  version: 1;
  modules: Record<string, ModuleProgress>;
}

export const MAX_PROGRESS_BYTES = 64 * 1024;
const MAX_MODULES = 500;
const MODULE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

export function emptyProgress(): ProgressDocument {
  return { version: 1, modules: {} };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isInstant = (value: unknown): value is string =>
  typeof value === 'string' && ISO_INSTANT.test(value) && !Number.isNaN(Date.parse(value));

const isCount = (value: unknown): value is number =>
  Number.isInteger(value) && (value as number) >= 0;

function parseScore(value: unknown): FirstTryScore | null | undefined {
  if (value === null) return null;
  if (!isRecord(value) || !isCount(value['right']) || !isCount(value['total'])) return undefined;
  if (value['total'] === 0 || value['right'] > value['total']) return undefined;
  return { right: value['right'], total: value['total'] };
}

function parseEntry(value: unknown): ModuleProgress | null {
  if (!isRecord(value)) return null;
  const { done, doneAt, sessions, bestFirstTry, lastPracticedAt, updatedAt } = value;
  const score = parseScore(bestFirstTry);
  if (
    typeof done !== 'boolean' ||
    !(doneAt === null || isInstant(doneAt)) ||
    !isCount(sessions) ||
    score === undefined ||
    !(lastPracticedAt === null || isInstant(lastPracticedAt)) ||
    !isInstant(updatedAt)
  ) {
    return null;
  }
  return { done, doneAt, sessions, bestFirstTry: score, lastPracticedAt, updatedAt };
}

/** Document de progression validé et recopié champ par champ, ou `null` s'il est invalide. */
export function parseProgress(raw: unknown): ProgressDocument | null {
  if (!isRecord(raw) || raw['version'] !== 1 || !isRecord(raw['modules'])) return null;
  const entries = Object.entries(raw['modules']);
  if (entries.length > MAX_MODULES) return null;
  const modules: Record<string, ModuleProgress> = {};
  for (const [id, value] of entries) {
    const entry = parseEntry(value);
    if (!MODULE_ID.test(id) || !entry) return null;
    modules[id] = entry;
  }
  return { version: 1, modules };
}

/** Comme `parseProgress`, depuis un texte borné à 64 Ko ; jamais d'exception. */
export function parseProgressJson(text: string): ProgressDocument | null {
  if (text.length > MAX_PROGRESS_BYTES) return null;
  try {
    return parseProgress(JSON.parse(text));
  } catch {
    return null;
  }
}
