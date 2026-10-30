import { MODULES } from '../src/app/content/modules';

/** Chemins audités (axe, reflow) : chaque nouvelle page s'ajoute ici ; les modules, d'eux-mêmes. */
export function auditedPaths(): string[] {
  return [
    '/',
    '/reglages',
    '/404',
    ...MODULES.flatMap(({ id }) => [`/module/${id}`, `/module/${id}/entrainement`]),
  ];
}
