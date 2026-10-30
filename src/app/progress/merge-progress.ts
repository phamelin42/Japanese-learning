// Partagé avec la fonction serveur : import de types seulement, effacé à l'exécution.
import type { ModuleProgress, ProgressDocument } from './progress.model';

/** Par module, l'entrée la plus récente (`updatedAt`) l'emporte ; à égalité, celle de `a`. */
export function mergeProgress(a: ProgressDocument, b: ProgressDocument): ProgressDocument {
  const modules: Record<string, ModuleProgress> = { ...b.modules };
  for (const [id, entry] of Object.entries(a.modules)) {
    const other = modules[id];
    if (!other || Date.parse(entry.updatedAt) >= Date.parse(other.updatedAt)) modules[id] = entry;
  }
  return { version: 1, modules };
}
