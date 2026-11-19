import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'agemasu-kuremasu-moraimasu',
  title: 'あげます, くれます ou もらいます ?',
  kind: 'lecon',
  lessonDate: '2026-11-19',
  summary: 'Donner, me donner, recevoir : le choix dépend de qui reçoit (うち et そと).',
  sheet: [
    {
      heading: 'うち et そと',
      paragraphs: [
        'うちの ひと : mon groupe (moi, ma famille, mon amoureux ou mon amoureuse). そとの ひと : les autres.',
        'あげます (donner) : jamais quand celui qui reçoit est moi ou quelqu’un de mon groupe.',
        'くれます (me donner) : seulement quand celui qui reçoit est moi ou quelqu’un de mon groupe.',
        'もらいます (recevoir) : on se place du côté de celui qui reçoit ; le donneur prend に.',
      ],
      examples: [
        {
          ja: 'しげるさんは ナタリーさんに りんごを あげます。',
          fr: 'Shigeru donne une pomme à Nathalie.',
        },
        { ja: 'しげるさんは わたしに りんごを くれます。', fr: 'Shigeru me donne une pomme.' },
        {
          ja: 'わたしは しげるさんに りんごを もらいます。',
          fr: 'Je reçois une pomme de Shigeru.',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'agemasu-nataly',
      prompt: 'Shigeru donne une pomme à Nathalie : しげるさんは ナタリーさんに りんごを ＿＿。',
      promptLang: 'fr',
      answers: ['あげます'],
      answerLang: 'ja',
      explanation: 'Nathalie n’est pas de mon groupe : あげます.',
    },
    {
      id: 'kuremasu-watashi',
      prompt: 'Shigeru me donne une pomme : しげるさんは わたしに りんごを ＿＿。',
      promptLang: 'fr',
      answers: ['くれます'],
      answerLang: 'ja',
      explanation: 'C’est moi qui reçois : くれます.',
    },
    {
      id: 'kuremasu-musume',
      prompt: 'Shigeru donne une pomme à ma fille : しげるさんは むすめに りんごを ＿＿。',
      promptLang: 'fr',
      answers: ['くれます'],
      answerLang: 'ja',
      explanation: 'Ma fille fait partie de mon groupe (うち) : くれます, pas あげます.',
    },
    {
      id: 'moraimashita-shigeru',
      prompt: 'J’ai reçu une pomme de Shigeru : わたしは しげるさんに りんごを ＿＿。',
      promptLang: 'fr',
      answers: ['もらいました'],
      answerLang: 'ja',
    },
    {
      id: 'kuremashita-tomodachi',
      prompt: 'Un ami m’a offert un livre : ともだちが ほんを ＿＿。',
      promptLang: 'fr',
      answers: ['くれました'],
      answerLang: 'ja',
      explanation: 'On me donne : くれました.',
    },
    {
      id: 'agemashita-oji',
      prompt: 'J’ai offert une montre à mon oncle : おじに とけいを ＿＿。',
      promptLang: 'fr',
      answers: ['あげました'],
      answerLang: 'ja',
      explanation: 'C’est moi qui donne : あげました.',
    },
    {
      id: 'moraimashita-sobo',
      prompt: 'J’ai reçu des gants de ma grand-mère : そぼに てぶくろを ＿＿。',
      promptLang: 'fr',
      answers: ['もらいました'],
      answerLang: 'ja',
    },
    {
      id: 'kuremashita-sofu',
      prompt: 'Mon grand-père m’a donné une radio : そふが ラジオを ＿＿。',
      promptLang: 'fr',
      answers: ['くれました'],
      answerLang: 'ja',
      explanation: 'Le destinataire est moi : くれました.',
    },
  ],
};

export default module;
