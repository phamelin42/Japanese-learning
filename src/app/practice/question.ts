/** Une question de la série, quel que soit son origine (mot de vocabulaire ou exercice). */
export interface Question {
  /** `<motId>:fr-ja`, `<motId>:ja-fr` ou l'id de l'exercice. */
  id: string;
  prompt: string;
  promptLang: 'fr' | 'ja';
  /** Lecture en kana de l'invite, affichée sous un kanji. */
  promptReading?: string;
  accepted: readonly string[];
  answerLang: 'fr' | 'ja';
  /** Corrigé affiché après l'envoi. */
  expected: string;
  /** Lecture en kana du corrigé, quand il est en kanji. */
  expectedReading?: string;
  explanation?: string;
}
