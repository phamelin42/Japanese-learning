import { isKana, katakanaToHiragana } from '../content/kana';
import { normalizeFrench, normalizeJapanese } from './normalize';
import { romajiPattern } from './romaji';

const ROMAJI = /^[a-zāīūēōâîûêô'-]+$/u;

function checkJapanese(input: string, accepted: readonly string[]): boolean {
  const typed = normalizeJapanese(input);
  if (typed === '') return false;
  return accepted.some((answer) => {
    const expected = normalizeJapanese(answer);
    if (typed === expected) return true;
    if (!isKana(expected)) return false;
    // Katakana et hiragana se valent : la lecture compte, pas l'écriture choisie au clavier.
    if (isKana(typed)) return katakanaToHiragana(typed) === katakanaToHiragana(expected);
    return ROMAJI.test(typed) && romajiPattern(expected).test(typed);
  });
}

function checkFrench(input: string, accepted: readonly string[]): boolean {
  const typed = normalizeFrench(input);
  if (typed === '') return false;
  return accepted.some((answer) => {
    // « quel jour (de la semaine) » accepte la réponse avec ou sans la précision.
    const variants = [answer, answer.replace(/\s*\([^)]*\)/gu, ''), answer.replace(/[()]/gu, '')];
    return variants.some((variant) => normalizeFrench(variant) === typed);
  });
}

/** Vrai si la saisie correspond à l'une des réponses acceptées, dans la langue attendue. */
export function checkAnswer(
  input: string,
  accepted: readonly string[],
  lang: 'fr' | 'ja',
): boolean {
  return lang === 'ja' ? checkJapanese(input, accepted) : checkFrench(input, accepted);
}
