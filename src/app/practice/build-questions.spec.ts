import { StudyModule } from '../content/module.model';
import jours from '../content/modules/jours-de-la-semaine';
import { buildQuestions } from './build-questions';

describe('buildQuestions', () => {
  const questions = buildQuestions(jours);
  const byId = (id: string) => questions.find((q) => q.id === id)!;

  it('pose chaque mot dans les deux sens', () => {
    expect(questions).toHaveLength(jours.vocabulary!.length * 2);
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });

  it('demande d’écrire le japonais à partir du français, kana ou kanji', () => {
    expect(byId('lundi:fr-ja')).toMatchObject({
      prompt: 'lundi',
      promptLang: 'fr',
      answerLang: 'ja',
      accepted: ['げつようび', '月曜日'],
      expected: '月曜日',
      expectedReading: 'げつようび',
    });
  });

  it('demande le français à partir du kanji, avec sa lecture', () => {
    expect(byId('quel-jour:ja-fr')).toMatchObject({
      prompt: '何曜日',
      promptReading: 'なんようび',
      promptLang: 'ja',
      answerLang: 'fr',
      accepted: ['quel jour (de la semaine)', 'quel jour', 'quel jour de la semaine'],
      expected: 'quel jour (de la semaine)',
    });
  });

  it('n’affiche pas de lecture quand le mot n’a que des kana', () => {
    const kanaOnly: StudyModule = {
      ...jours,
      vocabulary: [{ id: 'cafe', fr: 'café', kana: 'コーヒー' }],
    };
    const [toJapanese, toFrench] = buildQuestions(kanaOnly);
    expect(toJapanese).toMatchObject({ expected: 'コーヒー', accepted: ['コーヒー'] });
    expect(toJapanese.expectedReading).toBeUndefined();
    expect(toFrench).toMatchObject({ prompt: 'コーヒー' });
    expect(toFrench.promptReading).toBeUndefined();
  });

  it('pose chaque exercice tel quel, le premier corrigé faisant foi', () => {
    const lesson: StudyModule = {
      ...jours,
      vocabulary: undefined,
      exercises: [
        {
          id: 'particule-wa',
          prompt: 'わたし＿＿がくせいです。',
          promptLang: 'ja',
          answers: ['は', 'wa'],
          answerLang: 'ja',
          explanation: 'は marque le thème.',
        },
      ],
    };
    expect(buildQuestions(lesson)).toEqual([
      {
        id: 'particule-wa',
        prompt: 'わたし＿＿がくせいです。',
        promptLang: 'ja',
        accepted: ['は', 'wa'],
        answerLang: 'ja',
        expected: 'は',
        explanation: 'は marque le thème.',
      },
    ]);
  });
});
