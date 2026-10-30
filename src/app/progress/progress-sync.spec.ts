import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CLOCK } from '../clock';
import { ProgressStore } from './progress-store';
import { ProgressSync, SYNC_SECRET_STORAGE_KEY } from './progress-sync';
import { ModuleProgress, ProgressDocument } from './progress.model';

function entry(updatedAt: string, change: Partial<ModuleProgress> = {}): ModuleProgress {
  return {
    done: false,
    doneAt: null,
    sessions: 1,
    bestFirstTry: null,
    lastPracticedAt: null,
    updatedAt,
    ...change,
  };
}

const remote: ProgressDocument = {
  version: 1,
  modules: { couleurs: entry('2026-10-29T08:00:00.000Z', { done: true }) },
};

describe('ProgressSync', () => {
  let http: HttpTestingController;
  let store: ProgressStore;

  function setUp(secret: string | null): ProgressSync {
    localStorage.clear();
    if (secret) localStorage.setItem(SYNC_SECRET_STORAGE_KEY, secret);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CLOCK, useValue: () => new Date('2026-10-30T10:00:00.000Z') },
      ],
    });
    const sync = TestBed.inject(ProgressSync);
    store = TestBed.inject(ProgressStore);
    http = TestBed.inject(HttpTestingController);
    TestBed.tick();
    return sync;
  }

  afterEach(() => http.verify());

  it('ne contacte pas le serveur sans code', async () => {
    const sync = setUp(null);
    await sync.syncNow();
    expect(sync.state()).toBe('off');
  });

  it('fusionne la progression distante et renvoie le résultat, code à l’appui', async () => {
    const sync = setUp('secret');
    store.setDone('jours', true);
    const done = sync.syncNow();

    const get = http.expectOne({ method: 'GET', url: '/api/progress' });
    expect(get.request.headers.get('Authorization')).toBe('Bearer secret');
    get.flush(remote);
    await Promise.resolve();

    const put = http.expectOne({ method: 'PUT', url: '/api/progress' });
    const sent = put.request.body as ProgressDocument;
    expect(Object.keys(sent.modules).sort()).toEqual(['couleurs', 'jours']);
    put.flush(sent);
    await done;

    expect(sync.state()).toBe('ok');
    expect(sync.lastSyncAt()).toBe('2026-10-30T10:00:00.000Z');
    expect(store.moduleProgress('couleurs')()?.done).toBe(true);
    expect(store.moduleProgress('jours')()?.done).toBe(true);
  });

  it('signale un code refusé sans toucher à la progression locale', async () => {
    const sync = setUp('mauvais');
    store.setDone('jours', true);
    const done = sync.syncNow();
    http
      .expectOne('/api/progress')
      .flush({ error: 'code refusé' }, { status: 401, statusText: 'Unauthorized' });
    await done;
    expect(sync.state()).toBe('unauthorized');
    expect(store.moduleProgress('jours')()?.done).toBe(true);
  });

  it('signale une erreur serveur sans toucher à la progression locale', async () => {
    const sync = setUp('secret');
    store.setDone('jours', true);
    const done = sync.syncNow();
    http
      .expectOne('/api/progress')
      .flush({ error: 'indisponible' }, { status: 503, statusText: 'Service Unavailable' });
    await done;
    expect(sync.state()).toBe('error');
    expect(store.moduleProgress('jours')()?.done).toBe(true);
  });

  it('ignore une réponse distante invalide', async () => {
    const sync = setUp('secret');
    store.setDone('jours', true);
    const done = sync.syncNow();
    http.expectOne('/api/progress').flush({ version: 9 });
    await done;
    expect(sync.state()).toBe('error');
    expect(store.moduleProgress('jours')()?.done).toBe(true);
  });

  it('ne perd pas une modification faite pendant la synchronisation', async () => {
    const sync = setUp('secret');
    const done = sync.syncNow();
    http.expectOne({ method: 'GET', url: '/api/progress' }).flush(remote);
    await Promise.resolve();
    store.setDone('jours', true);
    const put = http.expectOne({ method: 'PUT', url: '/api/progress' });
    put.flush(put.request.body);
    await done;
    expect(store.moduleProgress('jours')()?.done).toBe(true);
    expect(store.moduleProgress('couleurs')()?.done).toBe(true);
  });

  it('garde le code sur l’appareil, et l’oublie sur demande', () => {
    const sync = setUp(null);
    sync.setSecret('  nouveau  ');
    expect(localStorage.getItem(SYNC_SECRET_STORAGE_KEY)).toBe('nouveau');
    expect(sync.secret()).toBe('nouveau');
    sync.setSecret(null);
    expect(localStorage.getItem(SYNC_SECRET_STORAGE_KEY)).toBeNull();
    expect(sync.state()).toBe('off');
  });
});
