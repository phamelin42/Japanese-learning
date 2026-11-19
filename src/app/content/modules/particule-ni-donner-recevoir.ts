import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'particule-ni-donner-recevoir',
  title: 'La particule に : à qui, de qui',
  kind: 'lecon',
  lessonDate: '2026-11-19',
  summary:
    'Personne + に + objet + を + verbe : donner, envoyer, écrire, recevoir, emprunter, apprendre.',
  sheet: [
    {
      heading: 'Donner à quelqu’un : personne + に',
      paragraphs: [
        'Structure : (わたしは) personne に objet を verbe.',
        'に marque la personne vers qui va l’objet avec あげます, おくります, かします, おしえます, かきます (une lettre), かけます (un appel).',
      ],
      examples: [
        { ja: 'ともだちに プレゼントを あげます。', fr: 'J’offre un cadeau à un ami.' },
        { ja: 'ははに にもつを おくりました。', fr: 'J’ai envoyé un colis à ma mère.' },
        { ja: 'かぞくに でんわを かけます。', fr: 'Je téléphone à ma famille.' },
      ],
    },
    {
      heading: 'Recevoir de quelqu’un : aussi に',
      paragraphs: [
        'Avec もらいます, かります et ならいます, に marque la personne de qui on reçoit, emprunte ou apprend. On peut aussi dire から.',
        'Pour demander : だれに …ましたか (à qui ? de qui ?), なにを …ましたか (quoi ?).',
      ],
      examples: [
        { ja: 'あにに シャツを もらいました。', fr: 'J’ai reçu une chemise de mon grand frère.' },
        {
          ja: 'せんせいに にほんごを ならいます。',
          fr: 'J’apprends le japonais avec mon professeur.',
        },
        { ja: 'だれに かさを かりましたか。', fr: 'À qui avez-vous emprunté un parapluie ?' },
      ],
    },
  ],
  exercises: [
    {
      id: 'ni-tegami',
      prompt: 'J’écris une lettre à mon professeur : せんせい＿＿ てがみを かきます。',
      promptLang: 'fr',
      answers: ['に'],
      answerLang: 'ja',
      explanation: 'に marque la personne à qui l’on écrit.',
    },
    {
      id: 'wo-purezento',
      prompt: 'J’offre un cadeau à un ami : ともだちに プレゼント＿＿ あげます。',
      promptLang: 'fr',
      answers: ['を'],
      answerLang: 'ja',
      explanation: 'を marque l’objet donné ; に, la personne qui le reçoit.',
    },
    {
      id: 'okurimasu-nimotsu',
      prompt: 'J’envoie un colis à ma mère : ははに にもつを ＿＿。',
      promptLang: 'fr',
      answers: ['おくります', '送ります'],
      answerLang: 'ja',
    },
    {
      id: 'kakemasu-denwa',
      prompt: 'Je téléphone à un ami : ともだちに でんわを ＿＿。',
      promptLang: 'fr',
      answers: ['かけます'],
      answerLang: 'ja',
      explanation: 'でんわを かけます : passer un appel.',
    },
    {
      id: 'kashimasu-keitai',
      prompt: 'Je prête mon portable à ma petite sœur : いもうとに けいたいを ＿＿。',
      promptLang: 'fr',
      answers: ['かします', '貸します'],
      answerLang: 'ja',
    },
    {
      id: 'karimashita-kasa',
      prompt: 'J’ai emprunté un parapluie à un ami : ともだちに かさを ＿＿。',
      promptLang: 'fr',
      answers: ['かりました', '借りました'],
      answerLang: 'ja',
      explanation: 'Au passé : かります → かりました.',
    },
    {
      id: 'naraimasu-nihongo',
      prompt: 'J’apprends le japonais avec mon professeur : せんせいに にほんごを ＿＿。',
      promptLang: 'fr',
      answers: ['ならいます', '習います'],
      answerLang: 'ja',
      explanation: 'ならいます : apprendre auprès de quelqu’un (に).',
    },
    {
      id: 'oshiemasu-furansugo',
      prompt: 'J’enseigne le français à un ami : ともだちに フランスごを ＿＿。',
      promptLang: 'fr',
      answers: ['おしえます', '教えます'],
      answerLang: 'ja',
    },
    {
      id: 'dare-meeru',
      prompt: 'À qui avez-vous envoyé un e-mail ? ＿＿に メールを おくりましたか。',
      promptLang: 'fr',
      answers: ['だれ'],
      answerLang: 'ja',
      explanation: 'だれに : à qui.',
    },
    {
      id: 'nani-tanjoubi',
      prompt: 'Qu’avez-vous reçu pour votre anniversaire ? たんじょうびに ＿＿を もらいましたか。',
      promptLang: 'fr',
      answers: ['なに'],
      answerLang: 'ja',
      explanation: 'なにを : quoi (l’objet).',
    },
    {
      id: 'traduire-okane',
      prompt: 'Traduisez : J’ai reçu de l’argent de mon père. (ちち, おかね)',
      promptLang: 'fr',
      answers: [
        'ちちにおかねをもらいました',
        'ちちからおかねをもらいました',
        'わたしはちちにおかねをもらいました',
      ],
      answerLang: 'ja',
      explanation: 'Personne に (ou から) + objet を + もらいました.',
    },
    {
      id: 'traduire-hana',
      prompt: 'Traduisez : J’ai offert des fleurs à un ami. (ともだち, はな)',
      promptLang: 'fr',
      answers: ['ともだちにはなをあげました', 'わたしはともだちにはなをあげました'],
      answerLang: 'ja',
    },
  ],
};

export default module;
