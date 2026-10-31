import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'adjectifs-i-et-na-relies',
  title: 'Relier les adjectifs en い et en な',
  kind: 'lecon',
  lessonDate: '2026-10-31',
  summary: 'Mettre plusieurs adjectifs dans la même phrase : やすくて, しんせつで…',
  sheet: [
    {
      heading: 'Relier deux adjectifs',
      paragraphs: [
        'Pour dire « beau et pas cher », on relie les adjectifs : le premier change de forme, le dernier garde sa forme habituelle (です).',
        'La forme dépend du type de l’adjectif : en い ou en な.',
      ],
    },
    {
      heading: 'Adjectif en い : い devient くて',
      paragraphs: [
        'やすい → やすくて (pas cher, et…) ; わかい → わかくて (jeune, et…) ; うつくしい → うつくしくて (beau, et…).',
        'Exception : いい (bien) devient よくて.',
      ],
      examples: [
        { ja: 'この かびんは うつくしくて やすいです。', fr: 'Ce vase est beau et pas cher.' },
        { ja: 'あの ひとは わかくて ハンサムです。', fr: 'Il est jeune et beau gosse.' },
      ],
    },
    {
      heading: 'Adjectif en な : な devient で',
      paragraphs: [
        'On enlève な et on ajoute で : しんせつな → しんせつで ; げんきな → げんきで ; べんりな → べんりで.',
      ],
      examples: [
        { ja: 'かのじょは しんせつで わかいです。', fr: 'Elle est gentille et jeune.' },
        { ja: 'この みせは べんりで やすいです。', fr: 'Ce magasin est pratique et pas cher.' },
      ],
    },
    {
      heading: 'Comment reconnaître le type ?',
      paragraphs: [
        'Un adjectif en い se termine par い. Les autres sont en な.',
        'Attention : quelques adjectifs finissent par い mais sont en な, par exemple きれい (joli, propre) et きらい (ne pas aimer).',
      ],
    },
  ],
  exercises: [
    {
      id: 'yasukute-benri',
      prompt: 'Ce magasin est pas cher et pratique (やすい) : この みせは ＿＿ べんりです。',
      promptLang: 'fr',
      answers: ['やすくて'],
      answerLang: 'ja',
      explanation: 'やすい : い devient くて.',
    },
    {
      id: 'wakakute-hansamu',
      prompt: 'Il est jeune et beau gosse (わかい) : あの ひとは ＿＿ ハンサムです。',
      promptLang: 'fr',
      answers: ['わかくて'],
      answerLang: 'ja',
      explanation: 'わかい : い devient くて.',
    },
    {
      id: 'shinsetsude-wakai',
      prompt: 'Elle est gentille et jeune (しんせつな) : かのじょは ＿＿ わかいです。',
      promptLang: 'fr',
      answers: ['しんせつで'],
      answerLang: 'ja',
      explanation: 'しんせつな : な devient で.',
    },
    {
      id: 'utsukushikute-yasui',
      prompt: 'Ce vase est beau et pas cher (うつくしい) : この かびんは ＿＿ やすいです。',
      promptLang: 'fr',
      answers: ['うつくしくて'],
      answerLang: 'ja',
      explanation: 'うつくしい : い devient くて.',
    },
    {
      id: 'genkide-shinsetsu',
      prompt: 'Il est en forme et gentil (げんきな) : あの ひとは ＿＿ しんせつです。',
      promptLang: 'fr',
      answers: ['げんきで'],
      answerLang: 'ja',
      explanation: 'げんきな : な devient で.',
    },
    {
      id: 'yokute-yasui',
      prompt: 'Ce magazine est bon et pas cher (いい) : この ざっしは ＿＿ やすいです。',
      promptLang: 'fr',
      answers: ['よくて'],
      answerLang: 'ja',
      explanation: 'いい est irrégulier : いい → よくて.',
    },
    {
      id: 'omokute-ookii',
      prompt: 'Cette étagère est lourde et grande (おもい) : この たなは ＿＿ おおきいです。',
      promptLang: 'fr',
      answers: ['おもくて'],
      answerLang: 'ja',
      explanation: 'おもい : い devient くて.',
    },
    {
      id: 'benride-yasui',
      prompt: 'Ce magasin est pratique et pas cher (べんりな) : この みせは ＿＿ やすいです。',
      promptLang: 'fr',
      answers: ['べんりで'],
      answerLang: 'ja',
      explanation: 'べんりな : な devient で.',
    },
  ],
};

export default module;
