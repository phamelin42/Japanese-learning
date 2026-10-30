import { romajiPattern } from './romaji';

const accepts = (kana: string, romaji: string) => romajiPattern(kana).test(romaji);

describe('romajiPattern', () => {
  it.each([
    ['げつようび', 'getsuyoubi'],
    ['げつようび', 'getsuyōbi'],
    ['げつようび', 'getuyoubi'],
    ['わたしは', 'watashiwa'],
    ['わたしは', 'watasiha'],
    ['きって', 'kitte'],
    ['こんにちは', 'konnichiwa'],
    ['こんにちは', 'konnitiha'],
    ['きんえん', "kin'en"],
    ['きんえん', 'kinnen'],
    ['コーヒー', 'kōhī'],
    ['コーヒー', 'koohii'],
    ['コーヒー', 'ko-hi-'],
    ['しゃしん', 'shashin'],
    ['しゃしん', 'syasin'],
    ['まっちゃ', 'matcha'],
    ['まっちゃ', 'maccha'],
    ['せんせい', 'sensei'],
    ['せんせい', 'sensē'],
    ['おおきい', 'ookii'],
    ['おおきい', 'ōkii'],
    ['ほんを', 'honwo'],
    ['ほんを', 'hono'],
    ['ふじさん', 'fujisan'],
    ['ふじさん', 'huzisan'],
    ['しんぶん', 'shimbun'],
    ['しんぶん', 'shinbun'],
    ['パーティー', 'pa-thi-'],
    ['パーティー', 'pātī'],
    ['きゅう', 'kyuu'],
    ['きゅう', 'kyū'],
  ])('%s accepte « %s »', (kana, romaji) => {
    expect(accepts(kana, romaji)).toBe(true);
  });

  it.each([
    ['げつようび', 'getsuyobi', 'voyelle longue manquante'],
    ['おばあさん', 'obasan', 'voyelle longue manquante'],
    ['きって', 'kite', 'consonne double manquante'],
    ['きんえん', 'kinen', 'ん ambigu devant une voyelle'],
    ['げつようび', '', 'réponse vide'],
    ['げつようび', 'getsuyoubii', 'lettre en trop'],
    ['かようび', 'kayoubi ', 'espace non normalisé'],
    ['すいようび', 'getsuyoubi', 'autre mot'],
  ])('%s refuse « %s » (%s)', (kana, romaji) => {
    expect(accepts(kana, romaji)).toBe(false);
  });

  it('ne valide rien pour une réponse qui contient un kanji', () => {
    expect(accepts('月ようび', 'getsuyoubi')).toBe(false);
  });
});
