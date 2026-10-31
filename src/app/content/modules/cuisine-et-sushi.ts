import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'cuisine-et-sushi',
  title: 'Cuisine et sushi',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Crevette, thon, dorade, poivre, chef de sushi et cuisine japonaise.',
  vocabulary: [
    { id: 'ebi', fr: 'crevette', frAlternatives: ['crevettes'], kana: 'えび' },
    {
      id: 'itamae',
      fr: 'chef de sushi',
      frAlternatives: ['cuisinier', 'chef cuisinier', 'chef'],
      kana: 'いたまえ',
    },
    { id: 'maguro', fr: 'thon', kana: 'まぐろ' },
    { id: 'tai', fr: 'dorade', frAlternatives: ['daurade', 'daurade rose'], kana: 'たい' },
    { id: 'kosho', fr: 'poivre', kana: 'こしょう' },
    {
      id: 'nihon-ryouri',
      fr: 'cuisine japonaise',
      frAlternatives: ['la cuisine japonaise'],
      kana: 'にほんりょうり',
    },
  ],
};

export default module;
