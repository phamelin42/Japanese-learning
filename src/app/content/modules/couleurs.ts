import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'couleurs',
  title: 'Couleurs',
  kind: 'vocabulaire',
  lessonDate: '2026-11-08',
  summary: 'Rouge, bleu, blanc, noir, jaune, marron, vert, rose, gris, orange.',
  vocabulary: [
    {
      id: 'aka',
      fr: 'rouge',
      kana: 'あか',
      note: 'Devient un adjectif en い : あかい くるま.',
    },
    {
      id: 'ao',
      fr: 'bleu',
      kana: 'あお',
      note: 'Devient un adjectif en い : あおい くるま.',
    },
    {
      id: 'shiro',
      fr: 'blanc',
      frAlternatives: ['blanche'],
      kana: 'しろ',
      note: 'Devient un adjectif en い : しろい くるま.',
    },
    {
      id: 'kuro',
      fr: 'noir',
      frAlternatives: ['noire'],
      kana: 'くろ',
      note: 'Devient un adjectif en い : くろい くるま.',
    },
    {
      id: 'kiiro',
      fr: 'jaune',
      kana: 'きいろ',
      note: 'Devient un adjectif en い : きいろい くるま.',
    },
    {
      id: 'chairo',
      fr: 'marron',
      frAlternatives: ['brun', 'brune'],
      kana: 'ちゃいろ',
      note: 'Devient un adjectif en い : ちゃいろい くるま.',
    },
    {
      id: 'midori',
      fr: 'vert',
      frAlternatives: ['verte'],
      kana: 'みどり',
      note: 'Pas d’adjectif en い : on dit みどりの くるま.',
    },
    {
      id: 'pinku',
      fr: 'rose',
      kana: 'ピンク',
      note: 'Pas d’adjectif en い : on dit ピンクの くるま.',
    },
    {
      id: 'gure',
      fr: 'gris',
      frAlternatives: ['grise'],
      kana: 'グレー',
      note: 'Pas d’adjectif en い : on dit グレーの くるま.',
    },
    {
      id: 'orenji',
      fr: 'orange',
      kana: 'オレンジ',
      note: 'Pas d’adjectif en い : on dit オレンジの くるま.',
    },
  ],
};

export default module;
