import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'maison-et-objets',
  title: 'La maison et les objets',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Cuisine, étagère, vase, dictionnaire, magazine, timbre et vélo.',
  vocabulary: [
    { id: 'daidokoro', fr: 'cuisine (pièce)', frAlternatives: ['cuisine'], kana: 'だいどころ' },
    { id: 'tana', fr: 'étagère', frAlternatives: ['rayon'], kana: 'たな' },
    { id: 'kabin', fr: 'vase', kana: 'かびん' },
    { id: 'jisho', fr: 'dictionnaire', kana: 'じしょ' },
    { id: 'zasshi', fr: 'magazine', frAlternatives: ['revue'], kana: 'ざっし' },
    { id: 'kitte', fr: 'timbre', frAlternatives: ['timbre-poste'], kana: 'きって' },
    { id: 'jitensha', fr: 'vélo', frAlternatives: ['bicyclette'], kana: 'じてんしゃ' },
  ],
};

export default module;
