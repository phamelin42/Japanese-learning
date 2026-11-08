import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'adjectifs-negation-et-degres',
  title: 'Adjectifs : négation et degrés',
  kind: 'lecon',
  lessonDate: '2026-11-08',
  summary: 'Dire qu’un adjectif ne convient pas, et le nuancer : とても, あまり, ぜんぜん.',
  vocabulary: [
    {
      id: 'totemo',
      fr: 'très',
      kana: 'とても',
      note: 'Se met devant un adjectif à la forme positive.',
    },
    {
      id: 'amari',
      fr: 'pas très',
      frAlternatives: ['pas trop', 'pas beaucoup'],
      kana: 'あまり',
      note: 'Toujours suivi d’une négation : あまり おもしろくないです.',
    },
    {
      id: 'zenzen',
      fr: 'pas du tout',
      frAlternatives: ['absolument pas'],
      kana: 'ぜんぜん',
      note: 'Toujours suivi d’une négation : ぜんぜん きれいじゃないです.',
    },
  ],
  sheet: [
    {
      heading: 'Négation d’un adjectif en い',
      paragraphs: [
        'Le い final devient くない : たかい → たかくない, おもい → おもくない.',
        'Poli : くないです ou くありません. Exception : いい devient よくない (よくないです).',
      ],
      examples: [
        { ja: 'この かびんは やすくないです。', fr: 'Ce vase n’est pas cher.' },
        { ja: 'この ざっしは よくないです。', fr: 'Ce magazine n’est pas bon.' },
      ],
    },
    {
      heading: 'Négation d’un adjectif en な',
      paragraphs: [
        'On enlève な et on ajoute じゃない : きれい → きれいじゃない, しんせつ → しんせつじゃない.',
        'Poli : じゃないです ou じゃありません.',
      ],
      examples: [
        { ja: 'この みせは きれいじゃないです。', fr: 'Ce magasin n’est pas propre.' },
        { ja: 'かのじょは しんせつじゃありません。', fr: 'Elle n’est pas gentille.' },
      ],
    },
    {
      heading: 'とても, あまり, ぜんぜん',
      paragraphs: [
        'とても (très) va avec une phrase positive.',
        'あまり (pas très) et ぜんぜん (pas du tout) vont toujours avec une phrase négative.',
      ],
      examples: [
        { ja: 'この りょうりは とても おいしいです。', fr: 'Ce plat est très bon.' },
        {
          ja: 'この ほんは あまり おもしろくないです。',
          fr: 'Ce livre n’est pas très intéressant.',
        },
        { ja: 'わたしは ぜんぜん ひまじゃないです。', fr: 'Je ne suis pas du tout libre.' },
      ],
    },
  ],
  exercises: [
    {
      id: 'neg-yasui',
      prompt: 'Ce vase n’est pas cher (やすい) : この かびんは ＿＿。',
      promptLang: 'fr',
      answers: ['やすくないです', 'やすくありません', 'やすくない'],
      answerLang: 'ja',
      explanation: 'やすい : い devient くない.',
    },
    {
      id: 'neg-ii',
      prompt: 'Ce magazine n’est pas bon (いい) : この ざっしは ＿＿。',
      promptLang: 'fr',
      answers: ['よくないです', 'よくありません', 'よくない'],
      answerLang: 'ja',
      explanation: 'いい est irrégulier : いい → よくない.',
    },
    {
      id: 'neg-omoi',
      prompt: 'Cette étagère n’est pas très lourde (おもい) : この たなは あまり ＿＿。',
      promptLang: 'fr',
      answers: ['おもくないです', 'おもくありません', 'おもくない'],
      answerLang: 'ja',
      explanation: 'あまり demande la négation : おもい → おもくない.',
    },
    {
      id: 'neg-shinsetsu',
      prompt: 'Elle n’est pas gentille (しんせつ) : かのじょは ＿＿。',
      promptLang: 'fr',
      answers: [
        'しんせつじゃないです',
        'しんせつじゃありません',
        'しんせつではありません',
        'しんせつじゃない',
      ],
      answerLang: 'ja',
      explanation: 'しんせつ est en な : しんせつ → しんせつじゃない.',
    },
    {
      id: 'neg-kirei',
      prompt: 'Ce magasin n’est pas propre (きれい) : この みせは ＿＿。',
      promptLang: 'fr',
      answers: [
        'きれいじゃないです',
        'きれいじゃありません',
        'きれいではありません',
        'きれいじゃない',
      ],
      answerLang: 'ja',
      explanation: 'きれい est en な malgré son い : きれいじゃない.',
    },
    {
      id: 'neg-benri',
      prompt: 'Ce vélo n’est pas du tout pratique (べんり) : この じてんしゃは ぜんぜん ＿＿。',
      promptLang: 'fr',
      answers: [
        'べんりじゃないです',
        'べんりじゃありません',
        'べんりではありません',
        'べんりじゃない',
      ],
      answerLang: 'ja',
      explanation: 'ぜんぜん demande la négation ; べんり est en な : べんりじゃない.',
    },
    {
      id: 'degre-totemo',
      prompt:
        'Ce restaurant est très bon (とても / あまり) : この レストランは ＿＿ おいしいです。',
      promptLang: 'fr',
      answers: ['とても'],
      answerLang: 'ja',
      explanation: 'La phrase est positive : とても.',
    },
    {
      id: 'degre-amari',
      prompt: 'Ce livre n’est pas très intéressant : この ほんは ＿＿ おもしろくないです。',
      promptLang: 'fr',
      answers: ['あまり'],
      answerLang: 'ja',
      explanation: 'pas très = あまり + négation.',
    },
    {
      id: 'degre-zenzen',
      prompt: 'Je ne suis pas du tout libre : わたしは ＿＿ ひまじゃないです。',
      promptLang: 'fr',
      answers: ['ぜんぜん'],
      answerLang: 'ja',
      explanation: 'pas du tout = ぜんぜん + négation.',
    },
    {
      id: 'degre-wakai',
      prompt: 'Elle est très jeune (わかい) : かのじょは とても ＿＿。',
      promptLang: 'fr',
      answers: ['わかいです', 'わかい'],
      answerLang: 'ja',
      explanation: 'とても va avec la forme positive : わかいです.',
    },
  ],
};

export default module;
