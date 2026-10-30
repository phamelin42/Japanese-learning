import {
  ModuleProgress,
  parseProgress,
  parseProgressJson,
  ProgressDocument,
} from './progress.model';

const entry: ModuleProgress = {
  done: true,
  doneAt: '2026-10-30T10:00:00.000Z',
  sessions: 3,
  bestFirstTry: { right: 14, total: 16 },
  lastPracticedAt: '2026-10-30T09:55:00.000Z',
  updatedAt: '2026-10-30T10:00:00.000Z',
};
const valid: ProgressDocument = { version: 1, modules: { 'jours-de-la-semaine': entry } };

const withEntry = (change: Partial<Record<keyof ModuleProgress, unknown>>) => ({
  version: 1,
  modules: { 'jours-de-la-semaine': { ...entry, ...change } },
});

describe('parseProgress', () => {
  it('accepte un document valide', () => {
    expect(parseProgress(valid)).toEqual(valid);
  });

  it('accepte un document sans module', () => {
    expect(parseProgress({ version: 1, modules: {} })).toEqual({ version: 1, modules: {} });
  });

  it.each([
    ['null', null],
    ['une chaîne', 'progression'],
    ['un tableau', []],
    ['une autre version', { version: 2, modules: {} }],
    ['sans modules', { version: 1 }],
    ['des modules en tableau', { version: 1, modules: [] }],
    ['un identifiant invalide', { version: 1, modules: { 'Jours de la semaine': entry } }],
    ['un score négatif', withEntry({ bestFirstTry: { right: -1, total: 16 } })],
    [
      'plus de bonnes réponses que de questions',
      withEntry({ bestFirstTry: { right: 17, total: 16 } }),
    ],
    ['un score sur zéro question', withEntry({ bestFirstTry: { right: 0, total: 0 } })],
    ['un nombre de séries décimal', withEntry({ sessions: 1.5 })],
    ['une date invalide', withEntry({ updatedAt: 'hier' })],
    ['une date de fin invalide', withEntry({ doneAt: '2026-13-45T00:00:00Z' })],
    ['un état « terminé » qui n’est pas un booléen', withEntry({ done: 'oui' })],
    ['une entrée incomplète', { version: 1, modules: { essai: { done: true } } }],
  ])('refuse %s', (_, raw) => {
    expect(parseProgress(raw)).toBeNull();
  });

  it('refuse plus de 500 modules', () => {
    const modules = Object.fromEntries(
      Array.from({ length: 501 }, (_, i) => [`module-${i}`, entry]),
    );
    expect(parseProgress({ version: 1, modules })).toBeNull();
  });

  it('ignore les champs inconnus au lieu de les recopier', () => {
    const parsed = parseProgress({ ...withEntry({}), extra: 'x' });
    expect(parsed).toEqual(valid);
    expect(parsed).not.toHaveProperty('extra');
  });
});

describe('parseProgressJson', () => {
  it('lit un document JSON valide', () => {
    expect(parseProgressJson(JSON.stringify(valid))).toEqual(valid);
  });

  it.each(['', '{', 'null', '"texte"'])('refuse « %s » sans lever d’exception', (text) => {
    expect(parseProgressJson(text)).toBeNull();
  });

  it('refuse un texte de plus de 64 Ko avant même de le lire', () => {
    const huge = JSON.stringify({ ...valid, padding: 'x'.repeat(64 * 1024) });
    expect(parseProgressJson(huge)).toBeNull();
  });
});
