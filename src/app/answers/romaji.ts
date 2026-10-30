import { katakanaToHiragana } from '../content/kana';

/** Graphies Hepburn et Kunrei acceptées pour chaque kana. は, を, へ acceptent aussi leur lecture de particule. */
// prettier-ignore
const SINGLE: Record<string, readonly string[]> = {
  あ: ['a'], い: ['i'], う: ['u'], え: ['e'], お: ['o'],
  か: ['ka'], き: ['ki'], く: ['ku'], け: ['ke'], こ: ['ko'],
  が: ['ga'], ぎ: ['gi'], ぐ: ['gu'], げ: ['ge'], ご: ['go'],
  さ: ['sa'], し: ['shi', 'si'], す: ['su'], せ: ['se'], そ: ['so'],
  ざ: ['za'], じ: ['ji', 'zi'], ず: ['zu'], ぜ: ['ze'], ぞ: ['zo'],
  た: ['ta'], ち: ['chi', 'ti'], つ: ['tsu', 'tu'], て: ['te'], と: ['to'],
  だ: ['da'], ぢ: ['ji', 'di', 'zi'], づ: ['zu', 'du'], で: ['de'], ど: ['do'],
  な: ['na'], に: ['ni'], ぬ: ['nu'], ね: ['ne'], の: ['no'],
  は: ['ha', 'wa'], ひ: ['hi'], ふ: ['fu', 'hu'], へ: ['he', 'e'], ほ: ['ho'],
  ば: ['ba'], び: ['bi'], ぶ: ['bu'], べ: ['be'], ぼ: ['bo'],
  ぱ: ['pa'], ぴ: ['pi'], ぷ: ['pu'], ぺ: ['pe'], ぽ: ['po'],
  ま: ['ma'], み: ['mi'], む: ['mu'], め: ['me'], も: ['mo'],
  や: ['ya'], ゆ: ['yu'], よ: ['yo'],
  ら: ['ra'], り: ['ri'], る: ['ru'], れ: ['re'], ろ: ['ro'],
  わ: ['wa'], を: ['wo', 'o'], ゔ: ['vu'],
};

/** Kana suivi d'une petite lettre : syllabes contractées et sons des mots d'emprunt. */
// prettier-ignore
const PAIRS: Record<string, readonly string[]> = {
  しゃ: ['sha', 'sya'], しゅ: ['shu', 'syu'], しょ: ['sho', 'syo'], しぇ: ['she', 'sye'],
  ちゃ: ['cha', 'tya', 'cya'], ちゅ: ['chu', 'tyu', 'cyu'], ちょ: ['cho', 'tyo', 'cyo'], ちぇ: ['che', 'tye'],
  じゃ: ['ja', 'zya', 'jya'], じゅ: ['ju', 'zyu', 'jyu'], じょ: ['jo', 'zyo', 'jyo'], じぇ: ['je', 'zye', 'jye'],
  ぢゃ: ['ja', 'dya'], ぢゅ: ['ju', 'dyu'], ぢょ: ['jo', 'dyo'],
  ふぁ: ['fa'], ふぃ: ['fi'], ふぇ: ['fe'], ふぉ: ['fo'],
  てぃ: ['ti', 'thi'], でぃ: ['di', 'dhi'], とぅ: ['tu', 'twu'], どぅ: ['du', 'dwu'],
  うぃ: ['wi'], うぇ: ['we'], うぉ: ['wo'],
  ゔぁ: ['va'], ゔぃ: ['vi'], ゔぇ: ['ve'], ゔぉ: ['vo'],
};
for (const [kana, consonant] of Object.entries({
  き: 'k',
  ぎ: 'g',
  に: 'n',
  ひ: 'h',
  び: 'b',
  ぴ: 'p',
  み: 'm',
  り: 'r',
})) {
  PAIRS[`${kana}ゃ`] = [`${consonant}ya`];
  PAIRS[`${kana}ゅ`] = [`${consonant}yu`];
  PAIRS[`${kana}ょ`] = [`${consonant}yo`];
}

// prettier-ignore
const LONG_MARKS: Record<string, readonly string[]> = {
  a: ['ā', 'â'], i: ['ī', 'î'], u: ['ū', 'û'], e: ['ē', 'ê'], o: ['ō', 'ô'],
};
/** Voyelle écrite qui allonge la précédente : おう, えい, ああ… */
// prettier-ignore
const LENGTHENERS: Record<string, readonly string[]> = {
  a: ['あ'], i: ['い'], u: ['う'], e: ['い', 'え'], o: ['う', 'お'],
};
const VOWEL_KANA: Record<string, string> = { あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o' };

interface Mora {
  kana: string;
  spellings: readonly string[];
}

const NEVER = /(?!)/;

function toMorae(hiragana: string): Mora[] | null {
  const morae: Mora[] = [];
  for (let i = 0; i < hiragana.length;) {
    const pair = hiragana.slice(i, i + 2);
    const char = hiragana[i];
    if (PAIRS[pair]) {
      morae.push({ kana: pair, spellings: PAIRS[pair] });
      i += 2;
    } else if (SINGLE[char] || char === 'ん' || char === 'っ' || char === 'ー') {
      morae.push({ kana: char, spellings: SINGLE[char] ?? [] });
      i += 1;
    } else {
      return null;
    }
  }
  return morae;
}

const vowelOf = (spelling: string) => spelling.at(-1) ?? '';
// Les graphies ne contiennent que des lettres, « - » et « ' », littéraux hors d'une classe.
const group = (options: Iterable<string>) => `(?:${[...new Set(options)].join('|')})`;

/**
 * Expression ancrée qui accepte les graphies rōmaji d'une réponse en kana : Hepburn et Kunrei,
 * consonne doublée pour っ, n/nn/n' pour ん, voyelle longue écrite en double ou à macron
 * (jamais simple : « obasan » n'est pas おばあさん). L'entrée doit être normalisée
 * (`normalizeJapanese`). Une réponse qui n'est pas entièrement en kana ne valide rien.
 */
export function romajiPattern(kana: string): RegExp {
  const morae = toMorae(katakanaToHiragana(kana));
  if (!morae || morae.length === 0) return NEVER;

  const parts: string[] = [];
  for (let i = 0; i < morae.length; i++) {
    const mora = morae[i];
    const next = morae[i + 1];

    if (mora.kana === 'っ') {
      if (!next || next.spellings.length === 0) return NEVER;
      // Consonne doublée ; « tch » est la graphie Hepburn de っち.
      const doubled = next.spellings.flatMap((s) =>
        s.startsWith('ch') ? [`c${s}`, `t${s}`] : [`${s[0]}${s}`],
      );
      morae[i + 1] = { kana: next.kana, spellings: doubled };
      continue;
    }

    if (mora.kana === 'ん') {
      const beforeVowel = next && /^[aiueoy]/.test(next.spellings[0]);
      const beforeLabial = next && /^[bmp]/.test(next.spellings[0]);
      parts.push(
        group(beforeVowel ? ['nn', "n'"] : ['n', 'nn', "n'", ...(beforeLabial ? ['m'] : [])]),
      );
      continue;
    }

    if (mora.kana === 'ー') return NEVER; // ー sans voyelle avant : rien à allonger.

    const vowel = vowelOf(mora.spellings[0]);
    const lengthened = next && (next.kana === 'ー' || LENGTHENERS[vowel]?.includes(next.kana));
    if (lengthened) {
      const written = next.kana === 'ー' ? [vowel, '-'] : [VOWEL_KANA[next.kana]];
      parts.push(
        group(
          mora.spellings.flatMap((s) => [
            ...written.map((w) => s + w),
            ...(LONG_MARKS[vowel] ?? []).map((mark) => s.slice(0, -1) + mark),
          ]),
        ),
      );
      i += 1;
      continue;
    }

    parts.push(group(mora.spellings));
  }
  return new RegExp(`^${parts.join('')}$`, 'u');
}
