import { InjectionToken } from '@angular/core';

/** L'heure courante, remplacée dans les tests. */
export const CLOCK = new InjectionToken<() => Date>('CLOCK', {
  providedIn: 'root',
  factory: () => () => new Date(),
});
