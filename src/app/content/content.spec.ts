import { checkAnswer } from '../answers/check-answer';
import { romajiPattern } from '../answers/romaji';
import { buildQuestions } from '../practice/build-questions';
import { isKana } from './kana';
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

      it('accepte, à la saisie, chaque réponse qu’il attend', async () => {
        const rejected: string[] = [];
        for (const question of buildQuestions(await entry.load())) {
          for (const answer of question.accepted) {
            if (!checkAnswer(answer, question.accepted, question.answerLang)) {
              rejected.push(`${question.id} : « ${answer} »`);
            }
          }
        }
        expect(rejected).toEqual([]);
      });

      it('permet de saisir en rōmaji chaque réponse japonaise écrite en kana', async () => {
        const unsupported: string[] = [];
        for (const question of buildQuestions(await entry.load())) {
          if (question.answerLang !== 'ja') continue;
          for (const answer of question.accepted.filter(isKana)) {
            // « (?!) » : le motif qui ne valide rien, rendu pour un kana que la table ne connaît pas.
            if (romajiPattern(answer).source === '(?!)')
              unsupported.push(`${question.id} : ${answer}`);
          }
        }
        expect(unsupported).toEqual([]);
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
