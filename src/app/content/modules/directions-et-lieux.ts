import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'directions-et-lieux',
  title: 'Directions et lieux',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Gauche, droite, les points cardinaux, les positions et les lieux de la ville.',
  vocabulary: [
    { id: 'hidari', fr: 'gauche', kana: 'ひだり' },
    { id: 'migi', fr: 'droite', kana: 'みぎ' },
    { id: 'mae', fr: 'devant', frAlternatives: ['avant'], kana: 'まえ' },
    { id: 'ushiro', fr: 'derrière', kana: 'うしろ' },
    { id: 'ue', fr: 'sur', frAlternatives: ['dessus', 'au-dessus'], kana: 'うえ' },
    { id: 'shita', fr: 'en dessous', frAlternatives: ['dessous', 'sous'], kana: 'した' },
    { id: 'aida-ni', fr: 'entre', kana: 'あいだに' },
    { id: 'higashi', fr: 'est', kana: 'ひがし' },
    { id: 'nishi', fr: 'ouest', kana: 'にし' },
    { id: 'kita', fr: 'nord', kana: 'きた' },
    { id: 'minami', fr: 'sud', kana: 'みなみ' },
    {
      id: 'aruite',
      fr: 'à pied',
      frAlternatives: ['en marchant'],
      kana: 'あるいて',
      note: 'Forme en て de あるく (marcher).',
    },
    {
      id: 'noriba',
      fr: 'arrêt (de bus, de taxi)',
      frAlternatives: ['arrêt', 'quai', 'point d’embarquement'],
      kana: 'のりば',
    },
    {
      id: 'juubinkyoku',
      fr: 'bureau de poste',
      frAlternatives: ['poste', 'la poste'],
      kana: 'ゆうびんきょく',
    },
    {
      id: 'bijutsukan',
      fr: 'musée d’art',
      frAlternatives: ['musée'],
      kana: 'びじゅつかん',
    },
    {
      id: 'chuushajou',
      fr: 'parking',
      frAlternatives: ['parc de stationnement', 'stationnement'],
      kana: 'ちゅうしゃじょう',
    },
    {
      id: 'shokudou',
      fr: 'cantine',
      frAlternatives: ['restaurant', 'réfectoire', 'salle à manger'],
      kana: 'しょくどう',
    },
    { id: 'mise', fr: 'magasin', frAlternatives: ['boutique'], kana: 'みせ' },
    {
      id: 'yaoya',
      fr: 'marchand de légumes',
      frAlternatives: ['primeur', 'magasin de légumes'],
      kana: 'やおや',
    },
    {
      id: 'kawa',
      fr: 'rivière',
      frAlternatives: ['fleuve', 'cours d’eau'],
      kana: 'かわ',
    },
    { id: 'basho', fr: 'endroit', frAlternatives: ['lieu'], kana: 'ばしょ' },
  ],
};

export default module;
