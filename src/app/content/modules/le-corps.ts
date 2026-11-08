import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'le-corps',
  title: 'Le corps',
  kind: 'vocabulaire',
  lessonDate: '2026-11-08',
  summary:
    'Tête, cou, bras, main, doigts, ventre, genou, cuisse, yeux, nez, bouche, oreille, dents.',
  vocabulary: [
    { id: 'atama', fr: 'tête', kana: 'あたま' },
    { id: 'kubi', fr: 'cou', frAlternatives: ['nuque'], kana: 'くび' },
    { id: 'kata', fr: 'épaule', frAlternatives: ['épaules'], kana: 'かた' },
    { id: 'ude', fr: 'bras', kana: 'うで' },
    { id: 'hiji', fr: 'coude', frAlternatives: ['coudes'], kana: 'ひじ' },
    { id: 'te', fr: 'main', frAlternatives: ['mains'], kana: 'て' },
    { id: 'yubi', fr: 'doigts', frAlternatives: ['doigt'], kana: 'ゆび' },
    { id: 'mune', fr: 'poitrine', frAlternatives: ['torse'], kana: 'むね' },
    { id: 'onaka', fr: 'ventre', frAlternatives: ['estomac'], kana: 'おなか' },
    { id: 'momo', fr: 'cuisse', frAlternatives: ['cuisses'], kana: 'もも' },
    { id: 'hiza', fr: 'genou', frAlternatives: ['genoux'], kana: 'ひざ' },
    { id: 'me', fr: 'yeux', frAlternatives: ['œil', 'oeil'], kana: 'め' },
    {
      id: 'mayu',
      fr: 'sourcils',
      frAlternatives: ['sourcil'],
      kana: 'まゆ',
    },
    {
      id: 'hana-nez',
      fr: 'nez',
      kana: 'はな',
      note: 'Même prononciation que はな (fleur) : seul le contexte les distingue.',
    },
    { id: 'kuchi', fr: 'bouche', kana: 'くち' },
    { id: 'mimi', fr: 'oreille', frAlternatives: ['oreilles'], kana: 'みみ' },
    { id: 'ha', fr: 'dents', frAlternatives: ['dent'], kana: 'は' },
    {
      id: 'se',
      fr: 'taille (stature)',
      frAlternatives: ['taille', 'stature', 'dos'],
      kana: 'せ',
      note: 'La hauteur d’une personne, et aussi le dos : せが たかい (être grand).',
    },
  ],
};

export default module;
