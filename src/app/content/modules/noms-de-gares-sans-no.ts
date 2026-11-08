import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'noms-de-gares-sans-no',
  title: 'Les gares : pas de の',
  kind: 'lecon',
  lessonDate: '2026-11-08',
  summary: 'Gare de Tokyo, de Kyoto… : on colle えき au nom de la ville, sans の.',
  sheet: [
    {
      heading: 'Nom de ville + えき',
      paragraphs: [
        'Pour nommer une gare, on colle えき (gare) au nom de la ville, sans particule : とうきょう + えき = とうきょうえき (la gare de Tokyo).',
        'Ne pas confondre avec の, qui sert ailleurs à relier deux noms : わたしの ほん (mon livre).',
      ],
      examples: [
        { ja: 'とうきょうえき', fr: 'La gare de Tokyo.' },
        { ja: 'しんじゅくえき', fr: 'La gare de Shinjuku.' },
        { ja: 'わたしの ほん', fr: 'Mon livre.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'eki-toukyou',
      prompt: 'La gare de Tokyo (とうきょう) : ＿＿',
      promptLang: 'fr',
      answers: ['とうきょうえき'],
      answerLang: 'ja',
      explanation: 'Nom de ville + えき, sans の.',
    },
    {
      id: 'eki-shinjuku',
      prompt: 'La gare de Shinjuku (しんじゅく) : ＿＿',
      promptLang: 'fr',
      answers: ['しんじゅくえき'],
      answerLang: 'ja',
      explanation: 'Nom de ville + えき, sans の.',
    },
    {
      id: 'eki-kyouto',
      prompt: 'La gare de Kyoto (きょうと) : ＿＿',
      promptLang: 'fr',
      answers: ['きょうとえき'],
      answerLang: 'ja',
      explanation: 'Nom de ville + えき, sans の.',
    },
    {
      id: 'eki-oosaka',
      prompt: 'La gare d’Osaka (おおさか) : ＿＿',
      promptLang: 'fr',
      answers: ['おおさかえき'],
      answerLang: 'ja',
      explanation: 'Nom de ville + えき, sans の.',
    },
    {
      id: 'eki-yokohama',
      prompt: 'Complétez : よこはま＿＿ (gare de Yokohama)',
      promptLang: 'fr',
      answers: ['えき'],
      answerLang: 'ja',
      explanation: 'On colle えき directement : よこはまえき.',
    },
    {
      id: 'no-hon',
      prompt: 'Mon livre : わたし＿＿ ほん',
      promptLang: 'fr',
      answers: ['の'],
      answerLang: 'ja',
      explanation: 'Ici の est nécessaire : わたしの ほん (c’est le livre de quelqu’un).',
    },
  ],
};

export default module;
