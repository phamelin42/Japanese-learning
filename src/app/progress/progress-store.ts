import {
  afterNextRender,
  computed,
  inject,
  PLATFORM_ID,
  Service,
  signal,
  Signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CLOCK } from '../clock';
import {
  emptyProgress,
  FirstTryScore,
  ModuleProgress,
  parseProgressJson,
  ProgressDocument,
} from './progress.model';

export const PROGRESS_STORAGE_KEY = 'jl.progress';

const ratio = (score: FirstTryScore) => score.right / score.total;

/**
 * Progression de l'appareil (modules terminés, séries, meilleurs scores), gardée en
 * `localStorage`. Lue après le premier rendu : le HTML pré-rendu ne connaît pas l'appareil, et
 * lire plus tôt ferait diverger l'hydratation.
 */
@Service()
export class ProgressStore {
  private readonly clock = inject(CLOCK);
  private readonly state = signal<ProgressDocument>(emptyProgress());

  readonly progress: Signal<ProgressDocument> = this.state.asReadonly();
  /** Incrémenté à chaque modification locale (pas au chargement ni à `replace`). */
  readonly localChanges = signal(0);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) afterNextRender(() => this.load());
  }

  moduleProgress(id: string): Signal<ModuleProgress | null> {
    return computed(() => this.state().modules[id] ?? null);
  }

  setDone(id: string, done: boolean): void {
    const now = this.now();
    this.update(id, (entry) => ({ ...entry, done, doneAt: done ? now : null, updatedAt: now }));
  }

  recordSession(id: string, score: FirstTryScore): void {
    const now = this.now();
    this.update(id, (entry) => ({
      ...entry,
      sessions: entry.sessions + 1,
      bestFirstTry:
        entry.bestFirstTry && ratio(entry.bestFirstTry) >= ratio(score)
          ? entry.bestFirstTry
          : score,
      lastPracticedAt: now,
      updatedAt: now,
    }));
  }

  /** Remplace toute la progression (document fusionné par la synchronisation). */
  replace(document: ProgressDocument): void {
    this.state.set(document);
    this.save();
  }

  private update(id: string, change: (entry: ModuleProgress) => ModuleProgress): void {
    const current = this.state().modules[id] ?? {
      done: false,
      doneAt: null,
      sessions: 0,
      bestFirstTry: null,
      lastPracticedAt: null,
      updatedAt: this.now(),
    };
    this.state.update((doc) => ({ ...doc, modules: { ...doc.modules, [id]: change(current) } }));
    this.save();
    this.localChanges.update((n) => n + 1);
  }

  private load(): void {
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const parsed = stored === null ? null : parseProgressJson(stored);
      if (parsed) this.state.set(parsed);
    } catch {
      // Stockage indisponible (navigation privée stricte) : la progression reste en mémoire.
    }
  }

  private save(): void {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      // Quota dépassé ou stockage refusé : la progression reste en mémoire pour la session.
    }
  }

  private now(): string {
    return this.clock().toISOString();
  }
}
