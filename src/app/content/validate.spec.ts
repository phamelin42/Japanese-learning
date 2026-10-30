import { StudyModule } from './module.model';
import { validateModule } from './validate';

const valid: StudyModule = {
  id: 'essai',
  title: 'Essai',
  kind: 'vocabulaire',
  lessonDate: '2026-10-28',
  summary: 'Un module de test.',
  vocabulary: [{ id: 'lundi', fr: 'lundi', kana: 'げつようび', kanji: '月曜日' }],
  exercises: [
    {
      id: 'ex-1',
      prompt: 'Lundi se dit ＿＿.',
      promptLang: 'fr',
      answers: ['げつようび', '月曜日'],
      answerLang: 'ja',
    },
  ],
};

function withChange(change: Partial<StudyModule>): StudyModule {
  return { ...valid, ...change };
}

describe('validateModule', () => {
  it('accepte un module correct', () => {
    expect(validateModule(valid)).toEqual([]);
  });

  it('accepte un module de leçon sans vocabulaire', () => {
    expect(validateModule(withChange({ kind: 'lecon', vocabulary: undefined }))).toEqual([]);
  });

  it.each(['Essai', 'essai_1', 'essai-', '-essai', 'été', ''])(
    'refuse l’identifiant de module « %s »',
    (id) =>
      expect(validateModule(withChange({ id }))).toContainEqual(expect.stringContaining('id')),
  );

  it.each(['2026-13-01', '2026-02-30', '28/10/2026', '2026-1-5', ''])(
    'refuse la date « %s »',
    (lessonDate) =>
      expect(validateModule(withChange({ lessonDate }))).toContainEqual(
        expect.stringContaining('date'),
      ),
  );

  it('refuse un module sans aucune question', () => {
    expect(validateModule(withChange({ vocabulary: [], exercises: undefined }))).toContainEqual(
      expect.stringContaining('question'),
    );
  });

  it('refuse deux mots de même identifiant', () => {
    const word = valid.vocabulary![0];
    expect(
      validateModule(withChange({ vocabulary: [word, { ...word, fr: 'autre' }] })),
    ).toContainEqual(expect.stringContaining('lundi'));
  });

  it('refuse un exercice qui reprend l’identifiant d’un mot', () => {
    const exercise = { ...valid.exercises![0], id: 'lundi' };
    expect(validateModule(withChange({ exercises: [exercise] }))).toContainEqual(
      expect.stringContaining('lundi'),
    );
  });

  it.each(['月曜日', 'getsuyoubi', 'げつ曜日'])(
    'refuse la lecture « %s » qui n’est pas en kana',
    (kana) => {
      expect(
        validateModule(withChange({ vocabulary: [{ ...valid.vocabulary![0], kana }] })),
      ).toContainEqual(expect.stringContaining('kana'));
    },
  );

  it('refuse un exercice sans réponse', () => {
    expect(
      validateModule(withChange({ exercises: [{ ...valid.exercises![0], answers: [] }] })),
    ).toContainEqual(expect.stringContaining('réponse'));
  });

  it('refuse une réponse en double', () => {
    expect(
      validateModule(
        withChange({
          exercises: [{ ...valid.exercises![0], answers: ['げつようび', 'げつようび'] }],
        }),
      ),
    ).toContainEqual(expect.stringContaining('double'));
  });

  it.each([
    ['titre', withChange({ title: ' ' })],
    ['résumé', withChange({ summary: '' })],
    ['français du mot', withChange({ vocabulary: [{ ...valid.vocabulary![0], fr: '' }] })],
    ['réponse vide', withChange({ exercises: [{ ...valid.exercises![0], answers: [' '] }] })],
    [
      'variante vide',
      withChange({ vocabulary: [{ ...valid.vocabulary![0], frAlternatives: [''] }] }),
    ],
    ['section vide', withChange({ sheet: [{ heading: '', paragraphs: ['Texte.'] }] })],
  ])('refuse un champ vide : %s', (_, module) => {
    expect(validateModule(module)).toContainEqual(expect.stringContaining('vide'));
  });
});
