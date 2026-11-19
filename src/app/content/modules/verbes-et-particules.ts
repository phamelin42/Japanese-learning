import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'verbes-et-particules',
  title: 'Verbes et particules : を, に, と',
  kind: 'lecon',
  lessonDate: '2026-11-19',
  summary: 'Quelle particule avec quel verbe : タクシーを よびます, あきこさんに あいます…',
  sheet: [
    {
      heading: 'La plupart des verbes : を',
      paragraphs: [
        'L’objet de l’action prend を : タクシーを よびます, てを あらいます, まどを あけます.',
        'でんしゃを おります : on descend du train (on le quitte), avec を.',
      ],
      examples: [
        { ja: 'テレビを つけます。', fr: 'J’allume la télé.' },
        { ja: 'ほんを かばんに いれます。', fr: 'Je mets le livre dans le sac.' },
      ],
    },
    {
      heading: 'Les exceptions à retenir : に et と',
      paragraphs: [
        'あいます (rencontrer) prend に : あきこさんに あいます.',
        'のります (monter dans) prend に : でんしゃに のります.',
        'Faire quelque chose avec quelqu’un : と. いぬと さんぽします (je me promène avec le chien).',
      ],
      examples: [
        { ja: 'えきで ともだちに あいます。', fr: 'Je retrouve un ami à la gare.' },
        { ja: 'でんしゃに のります。', fr: 'Je monte dans le train.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'wo-yobimasu',
      prompt: 'J’appelle un taxi : タクシー＿＿ よびます。',
      promptLang: 'fr',
      answers: ['を'],
      answerLang: 'ja',
    },
    {
      id: 'ni-aimasu',
      prompt: 'Je rencontre Akiko : あきこさん＿＿ あいます。',
      promptLang: 'fr',
      answers: ['に'],
      answerLang: 'ja',
      explanation: 'あいます se construit avec に.',
    },
    {
      id: 'haraimasu',
      prompt: 'Je paie : おかねを ＿＿。',
      promptLang: 'fr',
      answers: ['はらいます', '払います'],
      answerLang: 'ja',
      explanation: 'はらいます (payer), à ne pas confondre avec あらいます (laver).',
    },
    {
      id: 'araimasu',
      prompt: 'Je me lave les mains : てを ＿＿。',
      promptLang: 'fr',
      answers: ['あらいます', '洗います'],
      answerLang: 'ja',
    },
    {
      id: 'to-sanpo',
      prompt: 'Je me promène avec le chien : いぬ＿＿ さんぽします。',
      promptLang: 'fr',
      answers: ['と'],
      answerLang: 'ja',
      explanation: 'Avec quelqu’un (ou un animal) : と.',
    },
    {
      id: 'akemasu',
      prompt: 'J’ouvre la fenêtre : まどを ＿＿。',
      promptLang: 'fr',
      answers: ['あけます', '開けます'],
      answerLang: 'ja',
    },
    {
      id: 'shimemasu',
      prompt: 'Je ferme la fenêtre : まどを ＿＿。',
      promptLang: 'fr',
      answers: ['しめます', '閉めます'],
      answerLang: 'ja',
    },
    {
      id: 'tsukemasu',
      prompt: 'J’allume la télé : テレビを ＿＿。',
      promptLang: 'fr',
      answers: ['つけます'],
      answerLang: 'ja',
    },
    {
      id: 'keshimasu-terebi',
      prompt: 'J’éteins la télé : テレビを ＿＿。',
      promptLang: 'fr',
      answers: ['けします', '消します'],
      answerLang: 'ja',
    },
    {
      id: 'ni-norimasu',
      prompt: 'Je monte dans le train : でんしゃ＿＿ のります。',
      promptLang: 'fr',
      answers: ['に'],
      answerLang: 'ja',
      explanation: 'のります prend に ; おります (descendre) prend を.',
    },
    {
      id: 'wo-orimasu',
      prompt: 'Je descends du train : でんしゃ＿＿ おります。',
      promptLang: 'fr',
      answers: ['を'],
      answerLang: 'ja',
    },
    {
      id: 'okimasu',
      prompt: 'Je pose le livre sur la table : つくえの うえに ほんを ＿＿。',
      promptLang: 'fr',
      answers: ['おきます', '置きます'],
      answerLang: 'ja',
    },
  ],
};

export default module;
