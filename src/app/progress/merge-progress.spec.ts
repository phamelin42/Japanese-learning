import { mergeProgress } from './merge-progress';
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

const doc = (modules: Record<string, ModuleProgress>): ProgressDocument => ({
  version: 1,
  modules,
});

describe('mergeProgress', () => {
  it('garde les modules connus d’un seul côté', () => {
    const phone = doc({ jours: entry('2026-10-30T10:00:00Z', { done: true }) });
    const laptop = doc({ couleurs: entry('2026-10-30T11:00:00Z', { sessions: 4 }) });
    expect(mergeProgress(phone, laptop).modules).toEqual({
      jours: phone.modules['jours'],
      couleurs: laptop.modules['couleurs'],
    });
  });

  it('garde la version la plus récente d’un même module', () => {
    const older = doc({ jours: entry('2026-10-30T10:00:00Z', { done: true }) });
    const newer = doc({ jours: entry('2026-10-30T12:00:00Z', { sessions: 5 }) });
    expect(mergeProgress(older, newer).modules['jours']).toEqual(newer.modules['jours']);
    expect(mergeProgress(newer, older).modules['jours']).toEqual(newer.modules['jours']);
  });

  it('garde le premier document à date égale', () => {
    const a = doc({ jours: entry('2026-10-30T10:00:00Z', { sessions: 1 }) });
    const b = doc({ jours: entry('2026-10-30T10:00:00Z', { sessions: 2 }) });
    expect(mergeProgress(a, b).modules['jours'].sessions).toBe(1);
  });

  it('compare les dates comme des instants, pas comme du texte', () => {
    const utc = doc({ jours: entry('2026-10-30T10:00:00Z', { sessions: 1 }) });
    const later = doc({ jours: entry('2026-10-30T10:30:00.000+00:00', { sessions: 2 }) });
    expect(mergeProgress(later, utc).modules['jours'].sessions).toBe(2);
    expect(mergeProgress(utc, later).modules['jours'].sessions).toBe(2);
  });

  it('ne modifie aucun des deux documents', () => {
    const a = doc({ jours: entry('2026-10-30T10:00:00Z') });
    const b = doc({ couleurs: entry('2026-10-30T10:00:00Z') });
    mergeProgress(a, b);
    expect(Object.keys(a.modules)).toEqual(['jours']);
    expect(Object.keys(b.modules)).toEqual(['couleurs']);
  });
});
