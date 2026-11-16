/**
 * Graphies rōmaji → kana, comme un clavier japonais : Hepburn, Kunrei et les habitudes d'un IME
 * (chyo, shyu, jyo, ti, tu, xtu). La première graphie de chaque ligne est la plus courante.
 * Un kana qui s'écrit de deux façons (ぢ / じ, でぃ / ぢ) suit l'IME : « di » donne ぢ, « dhi » donne でぃ.
 */
// prettier-ignore
const TABLE: readonly (readonly string[])[] = [
  ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
  ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
  ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
  ['さ', 'sa'], ['し', 'shi', 'si'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'],
  ['ざ', 'za'], ['じ', 'ji', 'zi'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
  ['た', 'ta'], ['ち', 'chi', 'ti'], ['つ', 'tsu', 'tu'], ['て', 'te'], ['と', 'to'],
  ['だ', 'da'], ['ぢ', 'di'], ['づ', 'du'], ['で', 'de'], ['ど', 'do'],
  ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'],
  ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu', 'hu'], ['へ', 'he'], ['ほ', 'ho'],
  ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
  ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po'],
  ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
  ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'],
  ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
  ['わ', 'wa'], ['を', 'wo'],
  ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'],
  ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
  ['しゃ', 'sha', 'sya', 'shya'], ['しゅ', 'shu', 'syu', 'shyu'], ['しょ', 'sho', 'syo', 'shyo'],
  ['じゃ', 'ja', 'jya', 'zya'], ['じゅ', 'ju', 'jyu', 'zyu'], ['じょ', 'jo', 'jyo', 'zyo'],
  ['ちゃ', 'cha', 'tya', 'cya', 'chya'], ['ちゅ', 'chu', 'tyu', 'cyu', 'chyu'],
  ['ちょ', 'cho', 'tyo', 'cyo', 'chyo'],
  ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
  ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'],
  ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
  ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo'],
  ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
  ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'],
  ['ぢゃ', 'dya'], ['ぢゅ', 'dyu'], ['ぢょ', 'dyo'],
  ['しぇ', 'she', 'sye'], ['じぇ', 'je', 'jye', 'zye'], ['ちぇ', 'che', 'tye'],
  ['ふぁ', 'fa'], ['ふぃ', 'fi'], ['ふぇ', 'fe'], ['ふぉ', 'fo'],
  ['てぃ', 'thi'], ['でぃ', 'dhi'], ['とぅ', 'twu'], ['どぅ', 'dwu'],
  ['うぃ', 'wi'], ['うぇ', 'we'],
  ['ゔ', 'vu'], ['ゔぁ', 'va'], ['ゔぃ', 'vi'], ['ゔぇ', 've'], ['ゔぉ', 'vo'],
  ['ぁ', 'xa'], ['ぃ', 'xi'], ['ぅ', 'xu'], ['ぇ', 'xe'], ['ぉ', 'xo'],
  ['ゃ', 'xya'], ['ゅ', 'xyu'], ['ょ', 'xyo'], ['っ', 'xtu', 'xtsu'], ['ゎ', 'xwa'],
];

const KANA_OF = new Map<string, string>(
  TABLE.flatMap(([kana, ...spellings]) => spellings.map((s): [string, string] => [s, kana])),
);
const LONGEST = Math.max(...[...KANA_OF.keys()].map((spelling) => spelling.length));
/** Débuts de graphie : tant qu'on en tient un, on attend la lettre suivante. */
const PENDING = new Set(
  [...KANA_OF.keys()].flatMap((spelling) =>
    Array.from({ length: spelling.length - 1 }, (_, i) => spelling.slice(0, i + 1)),
  ),
);

const VOWEL = /[aiueo]/;
const DOUBLEABLE = /[bcdfghjkmpqrstvwxyz]/;
const LETTER = /[a-z]/;
const MACRON = /[āīūēōâîûêô]/u;
const AFTER_KANA = /[\p{Script=Hiragana}\p{Script=Katakana}]$/u;

/**
 * Transforme en kana (hiragana) ce qui est tapé en rōmaji, comme le fait un clavier japonais.
 * Appelée à chaque frappe sur tout le champ : les kana déjà là ne bougent pas et une graphie
 * incomplète (« ch », « n ») reste en lettres jusqu'à la lettre suivante. `final` sert à
 * l'envoi : un « n » resté en bout de saisie devient ん.
 *
 * ん : « n » devant une consonne, « n' », « nn » devant une consonne ou en fin ; « nn » devant
 * une voyelle donne ん puis la syllabe en n (konnichiwa), sauf devant y (nannyoubi : なんよう).
 * Consonne doublée : っ (kitte, matcha, tchi). « - » après un kana : ー.
 * Une saisie à macron (kōhī) est laissée telle quelle : elle n'a pas de transcription unique.
 */
export function romajiToKana(input: string, { final = false } = {}): string {
  if (MACRON.test(input)) return input;
  const text = input.replace(/[A-Z]/g, (letter) => letter.toLowerCase());
  let out = '';
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    const next = text[i + 1];

    if (!LETTER.test(char)) {
      out += char === '-' && AFTER_KANA.test(out) ? 'ー' : char;
      i += 1;
      continue;
    }

    if (char === 'n') {
      if (next === "'") {
        out += 'ん';
        i += 2;
        continue;
      }
      if (next === undefined) {
        if (final) out += 'ん';
        else out += 'n';
        i += 1;
        continue;
      }
      if (next === 'n') {
        const third = text[i + 2];
        if (third === undefined) {
          // « nn » en bout de saisie : on attend de savoir s'il y a une syllabe en n ensuite.
          if (final) out += 'ん';
          else out += 'nn';
          i += 2;
          continue;
        }
        if (third === 'y') {
          out += 'ん';
          i += 2;
          continue;
        }
        // Devant une voyelle, le second n commence la syllabe ; devant le reste, il est consommé.
        out += 'ん';
        i += VOWEL.test(third) ? 1 : 2;
        continue;
      }
      if (!VOWEL.test(next) && next !== 'y') {
        out += 'ん';
        i += 1;
        continue;
      }
    }

    if (DOUBLEABLE.test(char) && (next === char || text.startsWith('tch', i))) {
      out += 'っ';
      i += 1;
      continue;
    }

    let matched = false;
    for (let length = Math.min(LONGEST, text.length - i); length >= 1; length--) {
      const kana = KANA_OF.get(text.slice(i, i + length));
      if (kana) {
        out += kana;
        i += length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    const rest = text.slice(i);
    if (PENDING.has(rest)) {
      out += rest;
      break;
    }
    // Lettre qui ne mène à aucune syllabe : elle reste telle quelle.
    out += char;
    i += 1;
  }
  return out;
}
