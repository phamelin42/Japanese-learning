import { isKana, katakanaToHiragana } from './kana';

describe('isKana', () => {
  it.each(['げつようび', 'コーヒー', 'きって', 'なん・ようび', 'わたし は'])(
    'reconnaît « %s » comme des kana',
    (text) => expect(isKana(text)).toBe(true),
  );

  it.each(['月曜日', 'getsu', 'げつ曜日', '', '   ', 'ｹﾞﾂ'])('refuse « %s »', (text) =>
    expect(isKana(text)).toBe(false),
  );
});

describe('katakanaToHiragana', () => {
  it('convertit les katakana et garde le trait d’allongement', () => {
    expect(katakanaToHiragana('コーヒー')).toBe('こーひー');
  });

  it('laisse intacts les hiragana, kanji et lettres latines', () => {
    expect(katakanaToHiragana('きって月A')).toBe('きって月A');
  });

  it('convertit les petites lettres et ヴ', () => {
    expect(katakanaToHiragana('シャッヴ')).toBe('しゃっゔ');
  });
});
