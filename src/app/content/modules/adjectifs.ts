import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'adjectifs',
  title: 'Adjectifs',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Les adjectifs en い et en な du cours : jeune, beau, lourd, gentil, pratique…',
  vocabulary: [
    { id: 'wakai', fr: 'jeune', kana: 'わかい', note: 'Adjectif en い.' },
    {
      id: 'utsukushii',
      fr: 'beau',
      frAlternatives: ['magnifique'],
      kana: 'うつくしい',
      note: 'Adjectif en い.',
    },
    {
      id: 'ooi',
      fr: 'nombreux',
      frAlternatives: ['beaucoup', 'en grand nombre'],
      kana: 'おおい',
      note: 'Adjectif en い.',
    },
    { id: 'omoi', fr: 'lourd', kana: 'おもい', note: 'Adjectif en い.' },
    { id: 'kurai', fr: 'sombre', kana: 'くらい', note: 'Adjectif en い.' },
    {
      id: 'akarui',
      fr: 'clair',
      frAlternatives: ['lumineux'],
      kana: 'あかるい',
      note: 'Adjectif en い.',
    },
    {
      id: 'yasui',
      fr: 'pas cher',
      frAlternatives: ['bon marché'],
      kana: 'やすい',
      note: 'Adjectif en い. Forme en て : やすくて (voir la leçon sur les adjectifs).',
    },
    {
      id: 'shinsetsu',
      fr: 'gentil',
      frAlternatives: ['aimable', 'gentille'],
      kana: 'しんせつ',
      note: 'Adjectif en な : しんせつな.',
    },
    { id: 'benri', fr: 'pratique', kana: 'べんり', note: 'Adjectif en な : べんりな.' },
    {
      id: 'hansamu',
      fr: 'beau gosse',
      frAlternatives: ['beau (pour un homme)'],
      kana: 'ハンサム',
      note: 'Adjectif en な, mot d’emprunt (anglais « handsome »).',
    },
    {
      id: 'genki',
      fr: 'en forme',
      frAlternatives: ['en bonne santé', 'en pleine forme'],
      kana: 'げんき',
      note: 'Adjectif en な : げんきな.',
    },
    {
      id: 'kirai',
      fr: 'ne pas aimer',
      frAlternatives: ['détester', 'déteste'],
      kana: 'きらい',
      note: 'Adjectif en な, bien qu’il finisse par い : きらいな.',
    },
    {
      id: 'jouzu',
      fr: 'habile',
      frAlternatives: ['doué', 'bon (en)'],
      kana: 'じょうず',
      note: 'Adjectif en な : じょうずな.',
    },
    {
      id: 'heta',
      fr: 'maladroit',
      frAlternatives: ['pas doué', 'mauvais (en)'],
      kana: 'へた',
      note: 'Adjectif en な : へたな.',
    },
    {
      id: 'hima',
      fr: 'libre (disponible)',
      frAlternatives: ['libre', 'disponible', 'de temps libre'],
      kana: 'ひま',
      note: 'Adjectif en な : ひまな.',
    },
  ],
};

export default module;
