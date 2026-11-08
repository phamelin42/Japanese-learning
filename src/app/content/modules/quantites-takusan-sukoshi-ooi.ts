import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'quantites-takusan-sukoshi-ooi',
  title: 'Quantités : たくさん, すこし, おおい',
  kind: 'lecon',
  lessonDate: '2026-11-08',
  summary: 'Beaucoup, un peu, souvent : たくさん, すこし, よく, et la différence avec おおい.',
  vocabulary: [
    {
      id: 'takusan',
      fr: 'beaucoup (quantité)',
      frAlternatives: ['beaucoup', 'en quantité'],
      kana: 'たくさん',
      note: 'Se place devant le verbe : たくさん たべます. Devant un nom : たくさんの ほん.',
    },
    { id: 'sukoshi', fr: 'un peu', frAlternatives: ['peu'], kana: 'すこし' },
    {
      id: 'yoku',
      fr: 'souvent',
      frAlternatives: ['fréquemment'],
      kana: 'よく',
      note: 'La fréquence : よく いきます. Peut aussi vouloir dire « bien ».',
    },
  ],
  sheet: [
    {
      heading: 'Beaucoup et un peu',
      paragraphs: [
        'たくさん (beaucoup) et すこし (un peu) se placent devant le verbe.',
        'Devant un nom, たくさん prend の : たくさんの ひと (beaucoup de gens).',
      ],
      examples: [
        { ja: 'ほんが たくさん あります。', fr: 'Il y a beaucoup de livres.' },
        { ja: 'すこし たべます。', fr: 'Je mange un peu.' },
        { ja: 'たくさんの ひとが います。', fr: 'Il y a beaucoup de gens.' },
      ],
    },
    {
      heading: 'おおい ou たくさん ?',
      paragraphs: [
        'おおい est un adjectif en い (nombreux) : il termine la phrase et décrit ce qui est en grand nombre : ほんが おおいです.',
        'Il ne se place ni devant un verbe ni devant un nom : pour cela, on prend たくさん.',
      ],
      examples: [
        { ja: 'ほんが おおいです。', fr: 'Les livres sont nombreux.' },
        { ja: 'ほんが たくさん あります。', fr: 'Il y a beaucoup de livres.' },
      ],
    },
    {
      heading: 'とても et よく',
      paragraphs: [
        'とても (très) se met devant un adjectif : ce n’est pas une quantité de choses.',
        'よく (souvent) dit la fréquence : よく いきます.',
      ],
      examples: [
        { ja: 'この みせは とても おおきいです。', fr: 'Ce magasin est très grand.' },
        { ja: 'みせに よく いきます。', fr: 'Je vais souvent au magasin.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'quantite-ari-takusan',
      prompt: 'Il y a beaucoup de livres : ほんが ＿＿ あります。',
      promptLang: 'fr',
      answers: ['たくさん'],
      answerLang: 'ja',
      explanation: 'Devant le verbe : たくさん.',
    },
    {
      id: 'quantite-ooi',
      prompt: 'Les livres sont nombreux (おおい) : ほんが ＿＿。',
      promptLang: 'fr',
      answers: ['おおいです', 'おおい'],
      answerLang: 'ja',
      explanation: 'おおい termine la phrase.',
    },
    {
      id: 'quantite-sukoshi',
      prompt: 'Je mange un peu : ＿＿ たべます。',
      promptLang: 'fr',
      answers: ['すこし'],
      answerLang: 'ja',
      explanation: 'un peu = すこし.',
    },
    {
      id: 'quantite-yoku',
      prompt: 'Je vais souvent au magasin : みせに ＿＿ いきます。',
      promptLang: 'fr',
      answers: ['よく'],
      answerLang: 'ja',
      explanation: 'souvent = よく.',
    },
    {
      id: 'quantite-totemo',
      prompt: 'Ce magasin est très grand : この みせは ＿＿ おおきいです。',
      promptLang: 'fr',
      answers: ['とても'],
      answerLang: 'ja',
      explanation: 'très, devant un adjectif = とても.',
    },
    {
      id: 'quantite-takusan-no',
      prompt: 'Il y a beaucoup de gens : ＿＿ ひとが います。',
      promptLang: 'fr',
      answers: ['たくさんの'],
      answerLang: 'ja',
      explanation: 'Devant un nom, たくさん prend の : たくさんの ひと.',
    },
    {
      id: 'quantite-sukoshi-ari',
      prompt: 'Il y a un peu de livres : ほんが ＿＿ あります。',
      promptLang: 'fr',
      answers: ['すこし'],
      answerLang: 'ja',
      explanation: 'un peu = すこし.',
    },
  ],
};

export default module;
