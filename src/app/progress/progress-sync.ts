import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  afterNextRender,
  DestroyRef,
  effect,
  inject,
  Injector,
  PLATFORM_ID,
  Service,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CLOCK } from '../clock';
import { mergeProgress } from './merge-progress';
import { ProgressStore } from './progress-store';
import { parseProgress } from './progress.model';

export const SYNC_SECRET_STORAGE_KEY = 'jl.sync-secret';
const ENDPOINT = '/api/progress';
/** Délai entre la dernière modification et l'envoi : plusieurs changements, une requête. */
const DEBOUNCE_MS = 2000;

export type SyncState = 'off' | 'syncing' | 'ok' | 'error' | 'unauthorized';

function readSecret(): string | null {
  try {
    return localStorage.getItem(SYNC_SECRET_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Synchronise la progression de l'appareil avec `/api/progress` (voir ADR-001). Sans code, rien ne
 * part ; un échec laisse la copie locale intacte et la synchro reprend au prochain changement.
 */
@Service()
export class ProgressSync {
  private readonly http = inject(HttpClient);
  private readonly store = inject(ProgressStore);
  private readonly clock = inject(CLOCK);
  private readonly injector = inject(Injector);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly secretState = signal<string | null>(null);
  readonly secret = this.secretState.asReadonly();
  readonly state = signal<SyncState>('off');
  readonly lastSyncAt = signal<string | null>(null);

  private timer: ReturnType<typeof setTimeout> | undefined;
  private running: Promise<void> | null = null;
  private again = false;

  constructor() {
    if (this.isBrowser) afterNextRender(() => this.secretState.set(readSecret()));
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Synchronise tout de suite, puis après chaque modification locale. Appelé par la coquille. */
  start(): void {
    if (!this.isBrowser) return;
    this.secretState.set(readSecret());
    void this.syncNow();
    let first = true;
    effect(
      () => {
        this.store.localChanges();
        if (first) {
          first = false;
          return;
        }
        untracked(() => this.schedule());
      },
      { injector: this.injector },
    );
  }

  setSecret(secret: string | null): void {
    const value = secret?.trim() || null;
    try {
      if (value) localStorage.setItem(SYNC_SECRET_STORAGE_KEY, value);
      else localStorage.removeItem(SYNC_SECRET_STORAGE_KEY);
    } catch {
      // Stockage refusé : le code ne vaut que pour cette visite.
    }
    this.secretState.set(value);
    if (!value) this.state.set('off');
  }

  syncNow(): Promise<void> {
    if (this.running) {
      this.again = true;
      return this.running;
    }
    this.running = this.run().finally(() => {
      this.running = null;
      if (this.again) {
        this.again = false;
        void this.syncNow();
      }
    });
    return this.running;
  }

  private schedule(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.syncNow(), DEBOUNCE_MS);
  }

  private async run(): Promise<void> {
    const secret = this.secret();
    if (!secret) {
      this.state.set('off');
      return;
    }
    this.state.set('syncing');
    const headers = { Authorization: `Bearer ${secret}` };
    try {
      const remote = parseProgress(await firstValueFrom(this.http.get(ENDPOINT, { headers })));
      if (!remote) throw new Error('réponse invalide');
      const merged = mergeProgress(this.store.progress(), remote);
      const saved = parseProgress(
        await firstValueFrom(this.http.put(ENDPOINT, merged, { headers })),
      );
      if (!saved) throw new Error('réponse invalide');
      // Une modification faite pendant les requêtes est plus récente : elle l'emporte.
      this.store.replace(mergeProgress(this.store.progress(), saved));
      this.lastSyncAt.set(this.clock().toISOString());
      this.state.set('ok');
    } catch (error) {
      this.state.set(
        error instanceof HttpErrorResponse && error.status === 401 ? 'unauthorized' : 'error',
      );
    }
  }
}
