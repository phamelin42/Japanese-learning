import { MODULES } from './modules';
import { validateModule } from './validate';

describe('contenu des modules', () => {
  it('a au moins un module', () => {
    expect(MODULES.length).toBeGreaterThan(0);
  });

  it('n’a pas deux modules de même identifiant', () => {
    const ids = MODULES.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const entry of MODULES) {
    describe(entry.id, () => {
      it('ne contient aucune faute de saisie', async () => {
        expect(validateModule(await entry.load())).toEqual([]);
      });

      it('est décrit à l’identique dans l’index et dans son fichier', async () => {
        const { id, title, kind, lessonDate, summary } = await entry.load();
        expect({ id, title, kind, lessonDate, summary }).toEqual({
          id: entry.id,
          title: entry.title,
          kind: entry.kind,
          lessonDate: entry.lessonDate,
          summary: entry.summary,
        });
      });
    });
  }
});
