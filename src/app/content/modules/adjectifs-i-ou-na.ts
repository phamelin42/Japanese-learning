import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'adjectifs-i-ou-na',
  title: 'Adjectifs : い ou な ?',
  kind: 'lecon',
  lessonDate: '2026-11-08',
  summary: 'Réviser les adjectifs en い et en な, et savoir quoi faire des couleurs.',
  sheet: [
    {
      heading: 'Deux familles d’adjectifs',
      paragraphs: [
        'Adjectif en い : il se termine par い et se place tel quel devant le nom (たかい, おいしい, たのしい).',
        'Adjectif en な : on ajoute な devant le nom (きれいな, しんせつな, げんきな). À la fin de la phrase, な disparaît : きれいです.',
      ],
      examples: [
        { ja: 'おもしろい ほん', fr: 'Un livre intéressant.' },
        { ja: 'しんせつな ひと', fr: 'Une personne gentille.' },
        { ja: 'この ほんは おもしろいです。', fr: 'Ce livre est intéressant.' },
        { ja: 'あの ひとは しんせつです。', fr: 'Cette personne est gentille.' },
      ],
    },
    {
      heading: 'Les pièges : en な malgré le い',
      paragraphs: [
        'きれい (joli, propre) et きらい (ne pas aimer) finissent par い mais sont des adjectifs en な : きれいな はな, きらいな やさい.',
        'Un mot d’emprunt comme ハンサム est aussi en な.',
      ],
    },
    {
      heading: 'Les couleurs',
      paragraphs: [
        'Six couleurs ont un adjectif en い : あかい (rouge), あおい (bleu), しろい (blanc), くろい (noir), きいろい (jaune), ちゃいろい (marron).',
        'Les autres sont des noms et se relient par の : みどり (vert), ピンク (rose), グレー (gris), オレンジ (orange).',
      ],
      examples: [
        { ja: 'あかい くるま', fr: 'Une voiture rouge.' },
        { ja: 'みどりの くるま', fr: 'Une voiture verte.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'i-na-omoshiroi',
      prompt: 'Un livre intéressant (おもしろい) : これは ＿＿ ほんです。',
      promptLang: 'fr',
      answers: ['おもしろい'],
      answerLang: 'ja',
      explanation: 'おもしろい est en い : on le place tel quel devant le nom.',
    },
    {
      id: 'i-na-shinsetsu',
      prompt: 'Une personne gentille (しんせつ) : あの ひとは ＿＿ ひとです。',
      promptLang: 'fr',
      answers: ['しんせつな'],
      answerLang: 'ja',
      explanation: 'しんせつ est en な : しんせつな devant le nom.',
    },
    {
      id: 'i-na-kirei',
      prompt: 'Une fleur jolie (きれい) : これは ＿＿ はなです。',
      promptLang: 'fr',
      answers: ['きれいな'],
      answerLang: 'ja',
      explanation: 'きれい finit par い mais est en な : きれいな.',
    },
    {
      id: 'i-na-kirai',
      prompt: 'Un sport que je déteste (きらい) : ＿＿ スポーツです。',
      promptLang: 'fr',
      answers: ['きらいな'],
      answerLang: 'ja',
      explanation: 'きらい finit par い mais est en な : きらいな.',
    },
    {
      id: 'i-na-oishii',
      prompt: 'Un plat délicieux (おいしい) : これは ＿＿ りょうりです。',
      promptLang: 'fr',
      answers: ['おいしい'],
      answerLang: 'ja',
      explanation: 'おいしい est en い : on le place tel quel devant le nom.',
    },
    {
      id: 'couleur-aka',
      prompt: 'Une voiture rouge (あか) : ＿＿ くるまです。',
      promptLang: 'fr',
      answers: ['あかい'],
      answerLang: 'ja',
      explanation: 'あか a un adjectif en い : あかい.',
    },
    {
      id: 'couleur-kuro',
      prompt: 'Une voiture noire (くろ) : ＿＿ くるまです。',
      promptLang: 'fr',
      answers: ['くろい'],
      answerLang: 'ja',
      explanation: 'くろ a un adjectif en い : くろい.',
    },
    {
      id: 'couleur-midori',
      prompt: 'Une voiture verte : みどり＿＿ くるまです。',
      promptLang: 'fr',
      answers: ['の'],
      answerLang: 'ja',
      explanation: 'みどり n’a pas d’adjectif en い : c’est un nom, relié par の.',
    },
    {
      id: 'couleur-pinku',
      prompt: 'Une voiture rose : ピンク＿＿ くるまです。',
      promptLang: 'fr',
      answers: ['の'],
      answerLang: 'ja',
      explanation: 'ピンク est un nom : ピンクの くるま.',
    },
  ],
};

export default module;
