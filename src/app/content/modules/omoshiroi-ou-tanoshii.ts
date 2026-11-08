import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'omoshiroi-ou-tanoshii',
  title: 'おもしろい ou たのしい ?',
  kind: 'lecon',
  lessonDate: '2026-11-08',
  summary: 'Intéressant ou amusant : choisir entre おもしろい, たのしい et つまらない.',
  sheet: [
    {
      heading: 'Deux façons de dire « amusant »',
      paragraphs: [
        'おもしろい : intéressant, drôle. On juge la chose elle-même : un livre, un film, une histoire, une blague.',
        'たのしい : agréable, amusant. On dit le plaisir qu’on ressent : une fête, un voyage, un jeu.',
        'つまらない est le contraire des deux : ennuyeux, sans intérêt.',
      ],
      examples: [
        { ja: 'この えいがは おもしろいです。', fr: 'Ce film est intéressant (ou drôle).' },
        { ja: 'パーティーは たのしいです。', fr: 'La fête est agréable.' },
        { ja: 'この じゅぎょうは つまらないです。', fr: 'Ce cours est ennuyeux.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'omoshiroi-hon',
      prompt: 'Ce livre est intéressant : この ほんは ＿＿ です。',
      promptLang: 'fr',
      answers: ['おもしろい'],
      answerLang: 'ja',
      explanation: 'On juge le livre : おもしろい.',
    },
    {
      id: 'tanoshii-party',
      prompt: 'La fête est agréable : パーティーは ＿＿ です。',
      promptLang: 'fr',
      answers: ['たのしい'],
      answerLang: 'ja',
      explanation: 'Plaisir qu’on ressent : たのしい.',
    },
    {
      id: 'omoshiroi-eiga',
      prompt: 'Ce film est drôle : この えいがは ＿＿ です。',
      promptLang: 'fr',
      answers: ['おもしろい'],
      answerLang: 'ja',
      explanation: 'On juge le film : おもしろい.',
    },
    {
      id: 'tanoshii-ryokou',
      prompt: 'Le voyage est amusant : りょこうは ＿＿ です。',
      promptLang: 'fr',
      answers: ['たのしい'],
      answerLang: 'ja',
      explanation: 'Plaisir qu’on ressent : たのしい.',
    },
    {
      id: 'tsumaranai-jugyou',
      prompt: 'Ce cours est ennuyeux : この じゅぎょうは ＿＿ です。',
      promptLang: 'fr',
      answers: ['つまらない'],
      answerLang: 'ja',
      explanation: 'ennuyeux = つまらない.',
    },
    {
      id: 'omoshiroi-hanashi',
      prompt: 'Cette histoire est très intéressante : この はなしは とても ＿＿ です。',
      promptLang: 'fr',
      answers: ['おもしろい'],
      answerLang: 'ja',
      explanation: 'On juge l’histoire : おもしろい.',
    },
  ],
};

export default module;
