import { checkAnswer } from './check-answer';

describe('checkAnswer en japonais', () => {
  const monday = ['げつようび', '月曜日'];

  it.each(['げつようび', '月曜日', 'getsuyoubi', 'Getsuyōbi', 'げつようび。', 'ゲツヨウビ'])(
    'accepte « %s » pour lundi',
    (input) => expect(checkAnswer(input, monday, 'ja')).toBe(true),
  );

  it.each(['かようび', 'getsuyobi', '', '   ', '月'])('refuse « %s » pour lundi', (input) =>
    expect(checkAnswer(input, monday, 'ja')).toBe(false),
  );

  it('accepte une particule écrite comme elle se prononce, avec ou sans espace', () => {
    expect(checkAnswer('watashi wa', ['わたしは'], 'ja')).toBe(true);
  });

  it('accepte un mot en katakana tapé en hiragana', () => {
    expect(checkAnswer('こーひー', ['コーヒー'], 'ja')).toBe(true);
  });

  it('n’accepte pas le kanji d’un autre mot', () => {
    expect(checkAnswer('火曜日', monday, 'ja')).toBe(false);
  });
});

describe('checkAnswer en français', () => {
  it.each(['téléphone', 'telephone', 'Le téléphone.', 'TÉLÉPHONE'])('accepte « %s »', (input) =>
    expect(checkAnswer(input, ['téléphone'], 'fr')).toBe(true),
  );

  it('accepte toutes les variantes données', () => {
    expect(checkAnswer('quel jour', ['quel jour (de la semaine)', 'quel jour'], 'fr')).toBe(true);
  });

  it('accepte la réponse sans sa précision entre parenthèses', () => {
    expect(checkAnswer('quel jour', ['quel jour (de la semaine)'], 'fr')).toBe(true);
    expect(checkAnswer('quel jour de la semaine', ['quel jour (de la semaine)'], 'fr')).toBe(true);
  });

  it.each(['mardi', '', 'lund'])('refuse « %s » pour lundi', (input) =>
    expect(checkAnswer(input, ['lundi'], 'fr')).toBe(false),
  );

  it('ne prend pas une réponse en rōmaji pour du français', () => {
    expect(checkAnswer('getsuyoubi', ['lundi'], 'fr')).toBe(false);
  });
});
