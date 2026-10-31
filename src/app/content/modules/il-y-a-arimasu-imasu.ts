import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'il-y-a-arimasu-imasu',
  title: 'Il y a : あります et います',
  kind: 'lecon',
  lessonDate: '2026-10-31',
  summary: 'Dire qu’il y a quelque chose ou quelqu’un, et où : あります, います et les positions.',
  sheet: [
    {
      heading: 'あります ou います ?',
      paragraphs: [
        'Pour dire qu’il y a quelque chose ou quelqu’un à un endroit, on emploie deux verbes, selon ce qui est là.',
        'あります (arimasu) : une chose, un objet, un lieu, une plante.',
        'います (imasu) : un être animé, personne ou animal.',
        'Structure : lieu に + sujet が + あります / います. Le が (ga) marque ce qui est là.',
      ],
      examples: [
        { ja: 'たなの うえに かびんが あります。', fr: 'Il y a un vase sur l’étagère.' },
        { ja: 'いすの うしろに ねこが います。', fr: 'Il y a un chat derrière la chaise.' },
        { ja: 'みせの まえに ひとが います。', fr: 'Il y a quelqu’un devant le magasin.' },
      ],
    },
    {
      heading: 'Dire où : le mot de position',
      paragraphs: [
        'Le lieu se construit avec の : objet + の + position + に.',
        'うえ (sur), した (sous), まえ (devant), うしろ (derrière), あいだ (entre), みぎ (à droite), ひだり (à gauche).',
        'Pour « entre deux choses », on les relie par と : A と B の あいだに.',
      ],
      examples: [
        {
          ja: 'ゆうびんきょくの ひだりに みせが あります。',
          fr: 'Il y a un magasin à gauche de la poste.',
        },
        {
          ja: 'ゆうびんきょくと びじゅつかんの あいだに しょくどうが あります。',
          fr: 'Il y a une cantine entre la poste et le musée d’art.',
        },
      ],
    },
  ],
  exercises: [
    {
      id: 'arimasu-vase',
      prompt: 'Il y a un vase sur l’étagère : たなの うえに かびんが ＿＿。',
      promptLang: 'fr',
      answers: ['あります'],
      answerLang: 'ja',
      explanation: 'Un vase est une chose : あります.',
    },
    {
      id: 'imasu-chat',
      prompt: 'Il y a un chat derrière la chaise : いすの うしろに ねこが ＿＿。',
      promptLang: 'fr',
      answers: ['います'],
      answerLang: 'ja',
      explanation: 'Un chat est un être animé : います.',
    },
    {
      id: 'position-sous',
      prompt: 'Il y a un sac sous la table : テーブルの ＿＿に かばんが あります。',
      promptLang: 'fr',
      answers: ['した'],
      answerLang: 'ja',
      explanation: 'した : en dessous.',
    },
    {
      id: 'position-devant',
      prompt:
        'Il y a un musée d’art devant la poste : ゆうびんきょくの ＿＿に びじゅつかんが あります。',
      promptLang: 'fr',
      answers: ['まえ'],
      answerLang: 'ja',
      explanation: 'まえ : devant.',
    },
    {
      id: 'position-droite',
      prompt: 'Il y a un parking à droite du magasin : みせの ＿＿に ちゅうしゃじょうが あります。',
      promptLang: 'fr',
      answers: ['みぎ'],
      answerLang: 'ja',
      explanation: 'みぎ : la droite.',
    },
    {
      id: 'position-gauche',
      prompt: 'Il y a un magasin à gauche de la poste : ゆうびんきょくの ＿＿に みせが あります。',
      promptLang: 'fr',
      answers: ['ひだり'],
      answerLang: 'ja',
      explanation: 'ひだり : la gauche.',
    },
    {
      id: 'position-entre',
      prompt:
        'Il y a une cantine entre la poste et le musée d’art : ゆうびんきょくと びじゅつかんの ＿＿に しょくどうが あります。',
      promptLang: 'fr',
      answers: ['あいだ'],
      answerLang: 'ja',
      explanation: 'あいだ : l’espace entre deux choses.',
    },
    {
      id: 'imasu-personne',
      prompt: 'Il y a quelqu’un devant le magasin : みせの まえに ひとが ＿＿。',
      promptLang: 'fr',
      answers: ['います'],
      answerLang: 'ja',
      explanation: 'Une personne est un être animé : います.',
    },
    {
      id: 'arimasu-etagere',
      prompt: 'Il y a une étagère dans la cuisine : だいどころに たなが ＿＿。',
      promptLang: 'fr',
      answers: ['あります'],
      answerLang: 'ja',
      explanation: 'Une étagère est une chose : あります.',
    },
    {
      id: 'imasu-ami',
      prompt: 'Il y a un ami au parking : ちゅうしゃじょうに ともだちが ＿＿。',
      promptLang: 'fr',
      answers: ['います'],
      answerLang: 'ja',
      explanation: 'Un ami est une personne : います.',
    },
  ],
};

export default module;
