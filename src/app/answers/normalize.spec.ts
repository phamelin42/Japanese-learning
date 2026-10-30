import { normalizeFrench, normalizeJapanese } from './normalize';

const IDEOGRAPHIC_SPACE = String.fromCodePoint(0x3000);

describe('normalizeJapanese', () => {
  it.each([
    ['げつようび。', 'げつようび'],
    [`げつ${IDEOGRAPHIC_SPACE}ようび`, 'げつようび'],
    [' げつようび ', 'げつようび'],
    ['ｹﾞﾂ', 'ゲツ'],
    ['Getsuyoubi', 'getsuyoubi'],
    ['ＧＥＴＳＵ', 'getsu'],
    ['watashi wa', 'watashiwa'],
    ['kin’en', "kin'en"],
    ['げつようび！？', 'げつようび'],
  ])('« %s » → « %s »', (input, expected) => {
    expect(normalizeJapanese(input)).toBe(expected);
  });
});

describe('normalizeFrench', () => {
  it.each([
    ['Téléphone.', 'telephone'],
    ['le téléphone', 'telephone'],
    ['  lundi ', 'lundi'],
    ['l’ami', 'ami'],
    ["l'ami", 'ami'],
    ['Une   pomme !', 'pomme'],
    ['les jours', 'jours'],
    ['lever', 'lever'],
    ['unique', 'unique'],
  ])('« %s » → « %s »', (input, expected) => {
    expect(normalizeFrench(input)).toBe(expected);
  });
});
