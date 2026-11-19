import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'kara-parce-que',
  title: 'から : parce que, donc',
  kind: 'lecon',
  lessonDate: '2026-11-19',
  summary: 'Donner une raison : たかいですから、かいません (c’est cher, donc je n’achète pas).',
  sheet: [
    {
      heading: 'Cause + から, conséquence',
      paragraphs: [
        'から se place juste après la cause ; la conséquence vient ensuite.',
        'En français, on traduit par « parce que » ou par « donc », selon l’ordre de la phrase.',
      ],
      examples: [
        { ja: 'たかいですから、かいません。', fr: 'C’est cher, donc je n’achète pas.' },
        { ja: 'さむいですから、まどを しめます。', fr: 'Il fait froid, donc je ferme la fenêtre.' },
        {
          ja: 'びょうきですから、くすりを のみます。',
          fr: 'Je suis malade, donc je prends un médicament.',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'kara-takai',
      prompt: 'C’est cher, donc je n’achète pas : たかいです＿＿、かいません。',
      promptLang: 'fr',
      answers: ['から'],
      answerLang: 'ja',
    },
    {
      id: 'shimemasu-samui',
      prompt: 'Il fait froid, donc je ferme la fenêtre : さむいですから、まどを ＿＿。',
      promptLang: 'fr',
      answers: ['しめます', '閉めます'],
      answerLang: 'ja',
    },
    {
      id: 'akemasu-atsui',
      prompt: 'Il fait chaud, donc j’ouvre la fenêtre : あついですから、まどを ＿＿。',
      promptLang: 'fr',
      answers: ['あけます', '開けます'],
      answerLang: 'ja',
    },
    {
      id: 'kara-tesuto',
      prompt:
        'Demain il y a un examen, donc j’étudie : あしたは テストです＿＿、べんきょうします。',
      promptLang: 'fr',
      answers: ['から'],
      answerLang: 'ja',
    },
    {
      id: 'kara-byouki',
      prompt:
        'Je suis malade, donc je prends un médicament : びょうきです＿＿、くすりを のみます。',
      promptLang: 'fr',
      answers: ['から'],
      answerLang: 'ja',
      explanation: 'On « boit » un médicament en japonais : くすりを のみます.',
    },
    {
      id: 'karimasu-okane',
      prompt:
        'Je n’ai pas d’argent, donc j’en emprunte à mon frère : おかねが ありませんから、あにに ＿＿。',
      promptLang: 'fr',
      answers: ['かります', '借ります'],
      answerLang: 'ja',
    },
    {
      id: 'sens-kara',
      prompt: 'Que veut dire : あめですから、でかけません。',
      promptLang: 'ja',
      answers: [
        'il pleut donc je ne sors pas',
        'il pleut, donc je ne sors pas',
        'je ne sors pas parce qu’il pleut',
      ],
      answerLang: 'fr',
      explanation: 'あめ (pluie) + ですから : « il pleut, donc… ».',
    },
    {
      id: 'traduire-yuki',
      prompt: 'Traduisez : Il neige, donc il fait froid. (ゆき, さむい)',
      promptLang: 'fr',
      answers: ['ゆきですからさむいです', 'ゆきですから、さむいです'],
      answerLang: 'ja',
    },
  ],
};

export default module;
