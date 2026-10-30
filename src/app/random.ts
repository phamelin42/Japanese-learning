import { InjectionToken } from '@angular/core';

/** Source de hasard (0 ≤ n < 1), remplacée dans les tests pour un tirage reproductible. */
export const RANDOM = new InjectionToken<() => number>('RANDOM', {
  providedIn: 'root',
  factory: () => Math.random,
});
