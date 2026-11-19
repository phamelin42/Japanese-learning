import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'particule-de-moyen',
  title: 'La particule で : avec, en, par',
  kind: 'lecon',
  lessonDate: '2026-11-19',
  summary: 'Le moyen ou la langue : はしで たべます, にほんごで なんですか, ふなびんで おくります.',
  sheet: [
    {
      heading: 'Moyen + で + verbe',
      paragraphs: [
        'で marque l’outil ou le moyen : avec des baguettes, avec des ciseaux, par avion, en espèces.',
        'Pour demander « avec quoi ? » : なんで.',
      ],
      examples: [
        { ja: 'はしで すしを たべます。', fr: 'Je mange des sushis avec des baguettes.' },
        { ja: 'はさみで かみを きります。', fr: 'Je coupe le papier avec des ciseaux.' },
        { ja: 'エアメールで おくりました。', fr: 'Je l’ai envoyé par avion.' },
      ],
    },
    {
      heading: 'La langue + で',
      paragraphs: [
        'La langue est aussi un moyen : にほんごで かきます (j’écris en japonais).',
        'La question la plus utile : 〜は にほんごで なんですか (comment dit-on … en japonais ?).',
      ],
      examples: [
        { ja: 'これは にほんごで なんですか。', fr: 'Comment dit-on ceci en japonais ?' },
        {
          ja: 'ありがとうは フランスごで なんですか。',
          fr: 'Comment dit-on ありがとう en français ?',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'de-nihongo-nan',
      prompt: 'Comment dit-on ceci en japonais ? これは にほんご＿＿ なんですか。',
      promptLang: 'fr',
      answers: ['で'],
      answerLang: 'ja',
      explanation: 'La langue est le moyen : で.',
    },
    {
      id: 'de-hashi',
      prompt: 'Je mange avec des baguettes : はし＿＿ たべます。',
      promptLang: 'fr',
      answers: ['で'],
      answerLang: 'ja',
    },
    {
      id: 'kirimasu-hasami',
      prompt: 'Je coupe le papier avec des ciseaux : はさみで かみを ＿＿。',
      promptLang: 'fr',
      answers: ['きります', '切ります'],
      answerLang: 'ja',
    },
    {
      id: 'kakimasu-furansugo',
      prompt: 'J’écris une lettre en français : フランスごで てがみを ＿＿。',
      promptLang: 'fr',
      answers: ['かきます', '書きます'],
      answerLang: 'ja',
    },
    {
      id: 'de-funabin',
      prompt: 'J’envoie le colis par bateau : にもつを ふなびん＿＿ おくります。',
      promptLang: 'fr',
      answers: ['で'],
      answerLang: 'ja',
    },
    {
      id: 'de-genkin',
      prompt: 'Je paie en espèces : げんきん＿＿ はらいます。',
      promptLang: 'fr',
      answers: ['で'],
      answerLang: 'ja',
    },
    {
      id: 'keshimasu-keshigomu',
      prompt: 'J’efface avec une gomme : けしゴムで ＿＿。',
      promptLang: 'fr',
      answers: ['けします', '消します'],
      answerLang: 'ja',
    },
    {
      id: 'nan-de',
      prompt: 'Avec quoi mangez-vous ? ＿＿で たべますか。',
      promptLang: 'fr',
      answers: ['なん', 'なに'],
      answerLang: 'ja',
      explanation: 'なんで : avec quoi.',
    },
    {
      id: 'nan-desuka-arigatou',
      prompt: 'Comment dit-on ありがとう en français ? ありがとうは フランスごで ＿＿ですか。',
      promptLang: 'fr',
      answers: ['なん'],
      answerLang: 'ja',
      explanation: 'なんですか : qu’est-ce que c’est ?',
    },
    {
      id: 'traduire-kore-nihongo',
      prompt: 'Traduisez : Comment dit-on ceci en japonais ?',
      promptLang: 'fr',
      answers: ['これはにほんごでなんですか', 'これはにほんごでなんといいますか'],
      answerLang: 'ja',
    },
  ],
};

export default module;
