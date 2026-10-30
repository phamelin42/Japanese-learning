import { ModuleEntry } from '../module.model';

/**
 * Tous les modules, chargés à la demande. Un nouveau module s'ajoute ici et dans son fichier ;
 * `content.spec.ts` vérifie que les deux descriptions sont identiques.
 */
export const MODULES: readonly ModuleEntry[] = [
  {
    id: 'jours-de-la-semaine',
    title: 'Jours de la semaine',
    kind: 'vocabulaire',
    lessonDate: '2026-10-30',
    summary: 'Les sept jours, de lundi à dimanche, et comment demander quel jour on est.',
    load: () => import('./jours-de-la-semaine').then((m) => m.default),
  },
];
