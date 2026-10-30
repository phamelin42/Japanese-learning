import { StudyModule } from '../content/module.model';
import { Question } from './question';

/** Deux questions par mot (français → japonais, japonais → français), une par exercice. */
export function buildQuestions(module: StudyModule): Question[] {
  const fromVocabulary = (module.vocabulary ?? []).flatMap((word): Question[] => {
    const written = word.kanji ?? word.kana;
    const reading = word.kanji ? word.kana : undefined;
    return [
      {
        id: `${word.id}:fr-ja`,
        prompt: word.fr,
        promptLang: 'fr',
        accepted: word.kanji ? [word.kana, word.kanji] : [word.kana],
        answerLang: 'ja',
        expected: written,
        ...(reading && { expectedReading: reading }),
        ...(word.note && { explanation: word.note }),
      },
      {
        id: `${word.id}:ja-fr`,
        prompt: written,
        promptLang: 'ja',
        ...(reading && { promptReading: reading }),
        accepted: [word.fr, ...(word.frAlternatives ?? [])],
        answerLang: 'fr',
        expected: word.fr,
        ...(word.note && { explanation: word.note }),
      },
    ];
  });

  const fromExercises = (module.exercises ?? []).map((exercise): Question => ({
    id: exercise.id,
    prompt: exercise.prompt,
    promptLang: exercise.promptLang,
    accepted: exercise.answers,
    answerLang: exercise.answerLang,
    expected: exercise.answers[0],
    ...(exercise.explanation && { explanation: exercise.explanation }),
  }));

  return [...fromVocabulary, ...fromExercises];
}
