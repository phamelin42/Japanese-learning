import { foldSmallKana, isKana, katakanaToHiragana } from '../content/kana';
import { normalizeFrench, normalizeJapanese } from './normalize';
import { romajiPattern } from './romaji';

const ROMAJI = /^[a-zāīūēōâîûêô'-]+$/u;

/** Même lecture en kana : katakana et hiragana se valent, et la taille des petits kana s'oublie si demandé. */
function sameKana(typed: string, expected: string, ignoreSmallKana: boolean): boolean {
  const fold = (kana: string) =>
    ignoreSmallKana ? foldSmallKana(katakanaToHiragana(kana)) : katakanaToHiragana(kana);
  return fold(typed) === fold(expected);
}

function checkJapanese(input: string, accepted: readonly string[], strict: boolean): boolean {
  const typed = normalizeJapanese(input);
  if (typed === '') return false;
  return accepted.some((answer) => {
    const expected = normalizeJapanese(answer);
    if (typed === expected) return true;
    if (!isKana(expected)) return false;
    // La lecture compte, pas l'écriture choisie au clavier : katakana ou hiragana, et un petit
    // ょ tapé en taille normale (ちようど) reste la bonne réponse.
    if (isKana(typed)) return sameKana(typed, expected, !strict);
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
  return lang === 'ja' ? checkJapanese(input, accepted, false) : checkFrench(input, accepted);
}

/**
 * Vrai si la réponse japonaise est acceptée uniquement parce que la taille d'un petit kana
 * (ゃ ゅ ょ っ…) a été oubliée : l'application la valide mais le rappelle.
 */
export function hasSmallKanaSlip(
  input: string,
  accepted: readonly string[],
  lang: 'fr' | 'ja',
): boolean {
  return (
    lang === 'ja' && checkJapanese(input, accepted, false) && !checkJapanese(input, accepted, true)
  );
}
