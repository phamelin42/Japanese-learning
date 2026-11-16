import { romajiToKana } from './romaji-to-kana';

describe('romajiToKana', () => {
  it.each([
    ['a', 'あ'],
    ['getsuyoubi', 'げつようび'],
    ['kyou', 'きょう'],
    ['choudo', 'ちょうど'],
    ['chiyoudo', 'ちようど'],
    ['yakyuu', 'やきゅう'],
    ['shashin', 'しゃしん'],
    ['sensei', 'せんせい'],
    ['watashiwa', 'わたしわ'],
    ['kitte', 'きって'],
    ['matcha', 'まっちゃ'],
    ['maccha', 'まっちゃ'],
    ['kotchi', 'こっち'],
    ['fujisan', 'ふじさん'],
    ['huzisan', 'ふじさん'],
    ['jyouzu', 'じょうず'],
    ['shyukudai', 'しゅくだい'],
    ['chyawan', 'ちゃわん'],
    ['kamera', 'かめら'],
  ])('%s donne %s', (typed, kana) => expect(romajiToKana(typed, { final: true })).toBe(kana));

  it.each([
    ['konnichiwa', 'こんにちわ'],
    ['konnnichiwa', 'こんにちわ'],
    ['nannyoubi', 'なんようび'],
    ["kin'youbi", 'きんようび'],
    ['shinbun', 'しんぶん'],
    ['denwa', 'でんわ'],
    ['hon', 'ほん'],
    ['honn', 'ほん'],
    ['hon ya', 'ほん や'],
  ])('ん : %s donne %s', (typed, kana) => expect(romajiToKana(typed, { final: true })).toBe(kana));

  it.each([
    ['ko-hi-', 'こーひー'],
    ['pa-thi-', 'ぱーてぃー'],
    ['KYOUTO', 'きょうと'],
    ['ふじsan', 'ふじさん'],
    ['月youbi', '月ようび'],
    ['xtu', 'っ'],
    ['kixya', 'きゃ'],
  ])('%s donne %s', (typed, kana) => expect(romajiToKana(typed, { final: true })).toBe(kana));

  it('laisse en lettres une graphie incomplète tant que la suite manque', () => {
    expect(romajiToKana('ch')).toBe('ch');
    expect(romajiToKana('kyo')).toBe('きょ');
    expect(romajiToKana('kyoukyo')).toBe('きょうきょ');
    expect(romajiToKana('sh')).toBe('sh');
    expect(romajiToKana('tsu')).toBe('つ');
    expect(romajiToKana('ts')).toBe('ts');
    expect(romajiToKana('ny')).toBe('ny');
    expect(romajiToKana('ko')).toBe('こ');
    expect(romajiToKana('k')).toBe('k');
  });

  it('attend la lettre suivante pour un n final, et le transforme à l’envoi', () => {
    expect(romajiToKana('hon')).toBe('ほn');
    expect(romajiToKana('hon', { final: true })).toBe('ほん');
    expect(romajiToKana('honn')).toBe('ほnn');
    expect(romajiToKana('honn', { final: true })).toBe('ほん');
  });

  it('reprend une saisie déjà convertie sans rien changer (une frappe de plus à chaque fois)', () => {
    let shown = '';
    for (const letter of 'konnichiwa') {
      shown = romajiToKana(shown + letter);
    }
    expect(romajiToKana(shown, { final: true })).toBe('こんにちわ');
  });

  it('est stable : convertir deux fois donne le même résultat', () => {
    for (const typed of ['konnichiwa', 'chiyoudo', 'matcha', 'ko-hi-', 'nannyoubi', 'kyou']) {
      const once = romajiToKana(typed, { final: true });
      expect(romajiToKana(once, { final: true })).toBe(once);
    }
  });

  it('ne touche pas une saisie à macron : elle n’a pas de transcription unique', () => {
    expect(romajiToKana('kōhī')).toBe('kōhī');
    expect(romajiToKana('Getsuyōbi')).toBe('Getsuyōbi');
  });

  it('laisse en lettres ce qui ne mène à aucune syllabe', () => {
    expect(romajiToKana('qz', { final: true })).toBe('qz');
    expect(romajiToKana('a1b', { final: true })).toBe('あ1b');
  });

  it('ne change pas du kana, des espaces ni de la ponctuation', () => {
    expect(romajiToKana('こんにちは。 ようこそ！')).toBe('こんにちは。 ようこそ！');
  });
});
