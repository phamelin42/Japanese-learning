import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'famille-mienne-ou-autres',
  title: 'Ma famille ou celle des autres ?',
  kind: 'lecon',
  lessonDate: '2026-11-19',
  summary: 'ちち ou おとうさん : on choisit le mot selon que la famille est la sienne ou non.',
  sheet: [
    {
      heading: 'Deux séries de mots',
      paragraphs: [
        'Pour sa propre famille, on emploie des mots humbles et courts : ちち, はは, あに, あね…',
        'Pour la famille de quelqu’un d’autre, des mots polis, souvent avec お- et -さん : おとうさん, おかあさん, おにいさん, おねえさん…',
        'Pour s’adresser à ses propres parents ou aînés, on reprend la forme polie : « おかあさん ! ».',
      ],
      examples: [
        {
          ja: 'きのうは ちちの たんじょうびでした。',
          fr: 'Hier, c’était l’anniversaire de mon père.',
        },
        { ja: 'おとうさんに なにを あげましたか。', fr: 'Qu’avez-vous offert à votre père ?' },
        { ja: 'あにに シャツを もらいました。', fr: 'J’ai reçu une chemise de mon grand frère.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'chichi-tanjoubi',
      prompt: 'Hier, c’était l’anniversaire de mon père : きのうは ＿＿の たんじょうびでした。',
      promptLang: 'fr',
      answers: ['ちち', '父'],
      answerLang: 'ja',
      explanation: 'Mon père : ちち.',
    },
    {
      id: 'otousan-nani',
      prompt: 'Qu’avez-vous offert à votre père ? ＿＿に なにを あげましたか。',
      promptLang: 'fr',
      answers: ['おとうさん', 'お父さん'],
      answerLang: 'ja',
      explanation: 'Le père de l’autre personne : おとうさん.',
    },
    {
      id: 'okaasan-genki',
      prompt: 'Votre mère va bien ? ＿＿は げんきですか。',
      promptLang: 'fr',
      answers: ['おかあさん', 'お母さん'],
      answerLang: 'ja',
    },
    {
      id: 'imouto-gakusei',
      prompt: 'Ma petite sœur est étudiante : ＿＿は がくせいです。',
      promptLang: 'fr',
      answers: ['いもうと', '妹'],
      answerLang: 'ja',
    },
    {
      id: 'oneesan',
      prompt: 'Votre grande sœur : ＿＿',
      promptLang: 'fr',
      answers: ['おねえさん', 'お姉さん'],
      answerLang: 'ja',
    },
    {
      id: 'ani-shatsu',
      prompt: 'J’ai reçu une chemise de mon grand frère : ＿＿に シャツを もらいました。',
      promptLang: 'fr',
      answers: ['あに', '兄'],
      answerLang: 'ja',
    },
    {
      id: 'goshujin',
      prompt: 'Votre mari : ＿＿',
      promptLang: 'fr',
      answers: ['ごしゅじん', 'ご主人'],
      answerLang: 'ja',
    },
    {
      id: 'tsuma',
      prompt: 'Ma femme : ＿＿',
      promptLang: 'fr',
      answers: ['つま', '妻'],
      answerLang: 'ja',
      explanation: 'On entend aussi かない, plus ancien.',
    },
    {
      id: 'ojisan-ou-ojiisan',
      prompt: 'Votre oncle (attention à la voyelle) : ＿＿',
      promptLang: 'fr',
      answers: ['おじさん'],
      answerLang: 'ja',
      explanation: 'おじさん (oncle) ; おじいさん, avec い long, c’est le grand-père.',
    },
    {
      id: 'sens-otouto',
      prompt: 'Que veut dire おとうと ?',
      promptLang: 'ja',
      answers: ['mon petit frère', 'petit frère'],
      answerLang: 'fr',
      explanation: 'おとうと : mon petit frère. Celui de quelqu’un d’autre : おとうとさん.',
    },
  ],
};

export default module;
