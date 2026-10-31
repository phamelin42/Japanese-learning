import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'vetements-et-accessoires',
  title: 'Vêtements et accessoires',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Veste, pantalon, gants, chaussettes, lunettes et motifs.',
  vocabulary: [
    { id: 'uwagi', fr: 'veste', frAlternatives: ['veston'], kana: 'うわぎ' },
    { id: 'zubon', fr: 'pantalon', kana: 'ズボン' },
    { id: 'tebukuro', fr: 'gants', frAlternatives: ['gant'], kana: 'てぶくろ' },
    { id: 'kutsushita', fr: 'chaussettes', frAlternatives: ['chaussette'], kana: 'くつした' },
    { id: 'megane', fr: 'lunettes', frAlternatives: ['lunette'], kana: 'めがね' },
    { id: 'gara', fr: 'motif', frAlternatives: ['dessin', 'imprimé'], kana: 'がら' },
  ],
};

export default module;
