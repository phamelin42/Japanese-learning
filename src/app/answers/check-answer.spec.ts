import { checkAnswer, hasSmallKanaSlip } from './check-answer';

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

describe('petits kana tapés en taille normale', () => {
  // Un clavier de téléphone donne « ちよう » pour « chiyou » : la lecture est juste, seule la
  // taille du kana change. L'application n'a pas à refuser la réponse pour cela.
  it.each([
    ['ちようど', ['ちょうど']],
    ['きやく', ['きゃく']],
    ['しゆくだい', ['しゅくだい']],
    ['きつて', ['きって']],
    ['ちようど', ['チョウド', 'ちょうど']],
  ])('accepte « %s »', (input, accepted) => expect(checkAnswer(input, accepted, 'ja')).toBe(true));

  it('ne confond pas deux mots qui ne diffèrent pas par la taille', () => {
    expect(checkAnswer('きて', ['きって'], 'ja')).toBe(false);
    expect(checkAnswer('ちよど', ['ちょうど'], 'ja')).toBe(false);
  });

  it('signale la faute de taille, et seulement elle', () => {
    expect(hasSmallKanaSlip('ちようど', ['ちょうど'], 'ja')).toBe(true);
    expect(hasSmallKanaSlip('ちょうど', ['ちょうど'], 'ja')).toBe(false);
    expect(hasSmallKanaSlip('chyoudo', ['ちょうど'], 'ja')).toBe(false);
    expect(hasSmallKanaSlip('かようび', ['げつようび'], 'ja')).toBe(false);
    expect(hasSmallKanaSlip('ちようど', ['ちょうど'], 'fr')).toBe(false);
  });
});

describe('rōmaji à la Phil : chyo, shyu, jyo', () => {
  it.each([
    ['chyoudo', 'ちょうど'],
    ['shyukudai', 'しゅくだい'],
    ['jyouzu', 'じょうず'],
    ['kyaku', 'きゃく'],
    ['chyawan', 'ちゃわん'],
    ['shyashin', 'しゃしん'],
  ])('accepte « %s » pour %s', (input, kana) =>
    expect(checkAnswer(input, [kana], 'ja')).toBe(true),
  );
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
