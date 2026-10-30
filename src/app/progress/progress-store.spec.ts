import { TestBed } from '@angular/core/testing';
import { CLOCK } from '../clock';
import { PROGRESS_STORAGE_KEY, ProgressStore } from './progress-store';
import { ProgressDocument } from './progress.model';

describe('ProgressStore', () => {
  let now: Date;

  beforeEach(() => {
    localStorage.clear();
    now = new Date('2026-10-30T10:00:00.000Z');
  });

  function store(): ProgressStore {
    TestBed.configureTestingModule({ providers: [{ provide: CLOCK, useValue: () => now }] });
    const created = TestBed.inject(ProgressStore);
    TestBed.tick();
    return created;
  }

  /** Un nouvel appareil… ou la même page rechargée : un store neuf sur le même localStorage. */
  function reload(): ProgressStore {
    TestBed.resetTestingModule();
    return store();
  }

  it('ne connaît aucun module au départ', () => {
    expect(store().moduleProgress('jours')()).toBeNull();
  });

  it('garde un module terminé après rechargement', () => {
    store().setDone('jours', true);
    expect(reload().moduleProgress('jours')()).toMatchObject({
      done: true,
      doneAt: '2026-10-30T10:00:00.000Z',
      updatedAt: '2026-10-30T10:00:00.000Z',
    });
  });

  it('rouvre un module terminé', () => {
    const s = store();
    s.setDone('jours', true);
    now = new Date('2026-10-30T11:00:00.000Z');
    s.setDone('jours', false);
    expect(s.moduleProgress('jours')()).toMatchObject({
      done: false,
      doneAt: null,
      updatedAt: '2026-10-30T11:00:00.000Z',
    });
  });

  it('compte les séries et ne garde que le meilleur score', () => {
    const s = store();
    s.recordSession('jours', { right: 10, total: 16 });
    s.recordSession('jours', { right: 14, total: 16 });
    s.recordSession('jours', { right: 12, total: 16 });
    expect(reload().moduleProgress('jours')()).toMatchObject({
      sessions: 3,
      bestFirstTry: { right: 14, total: 16 },
      lastPracticedAt: '2026-10-30T10:00:00.000Z',
    });
  });

  it('compare les scores en proportion quand le module a changé de taille', () => {
    const s = store();
    s.recordSession('jours', { right: 8, total: 10 });
    s.recordSession('jours', { right: 12, total: 16 });
    expect(s.moduleProgress('jours')()?.bestFirstTry).toEqual({ right: 8, total: 10 });
  });

  it('repart d’une progression vide si le stockage est corrompu', () => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, '{pas du json');
    const s = store();
    expect(s.progress()).toEqual({ version: 1, modules: {} });
    s.setDone('jours', true);
    expect(reload().moduleProgress('jours')()?.done).toBe(true);
  });

  it('remplace la progression par un document fusionné et l’enregistre', () => {
    const merged: ProgressDocument = {
      version: 1,
      modules: {
        couleurs: {
          done: true,
          doneAt: '2026-10-29T08:00:00.000Z',
          sessions: 2,
          bestFirstTry: null,
          lastPracticedAt: null,
          updatedAt: '2026-10-29T08:00:00.000Z',
        },
      },
    };
    store().replace(merged);
    expect(reload().progress()).toEqual(merged);
  });

  it('continue de fonctionner quand le stockage refuse d’écrire', () => {
    const s = store();
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError');
    });
    s.setDone('jours', true);
    expect(s.moduleProgress('jours')()?.done).toBe(true);
    setItem.mockRestore();
  });
});
