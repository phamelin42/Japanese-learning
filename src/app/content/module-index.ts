import { InjectionToken } from '@angular/core';
import { ModuleEntry } from './module.model';
import { MODULES } from './modules';

/** L'index des modules, remplaçable dans les tests. */
export const MODULE_INDEX = new InjectionToken<readonly ModuleEntry[]>('MODULE_INDEX', {
  providedIn: 'root',
  factory: () => MODULES,
});

const LESSON_DATE = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' });

/** « 2026-10-28 » → « 28 octobre 2026 », sans dépendre du fuseau de l'appareil. */
export function formatLessonDate(isoDate: string): string {
  return LESSON_DATE.format(new Date(`${isoDate}T00:00:00Z`));
}

export const KIND_LABELS = { vocabulaire: 'Vocabulaire', lecon: 'Leçon' } as const;

// Le ciel de la carte distingue les deux types d'un coup d'œil ; le badge le dit en texte.
export const KIND_SKIES = { vocabulaire: 'sakura', lecon: 'asagi' } as const;
