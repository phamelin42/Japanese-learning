import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'verbes-du-quotidien',
  title: 'Verbes du quotidien',
  kind: 'vocabulaire',
  lessonDate: '2026-11-19',
  summary: 'Couper, prendre, acheter, payer, laver, ouvrir, fermer, allumer, monter, descendre…',
  vocabulary: [
    { id: 'kirimasu', fr: 'couper', kana: 'きります', kanji: '切ります' },
    { id: 'torimasu', fr: 'prendre', kana: 'とります', kanji: '取ります' },
    { id: 'mimasu', fr: 'regarder', frAlternatives: ['voir'], kana: 'みます', kanji: '見ます' },
    { id: 'kaimasu', fr: 'acheter', kana: 'かいます', kanji: '買います' },
    {
      id: 'suimasu',
      fr: 'fumer',
      kana: 'すいます',
      note: 'たばこを すいます : fumer une cigarette.',
    },
    {
      id: 'keshimasu',
      fr: 'effacer',
      frAlternatives: ['éteindre'],
      kana: 'けします',
      kanji: '消します',
      note: 'Effacer (けしゴムで けします) et aussi éteindre (テレビを けします).',
    },
    { id: 'yobimasu', fr: 'appeler (faire venir)', frAlternatives: ['appeler'], kana: 'よびます' },
    {
      id: 'aimasu',
      fr: 'rencontrer',
      frAlternatives: ['voir quelqu’un', 'retrouver'],
      kana: 'あいます',
      kanji: '会います',
      note: 'Se construit avec に : あきこさんに あいます.',
    },
    { id: 'haraimasu', fr: 'payer', kana: 'はらいます' },
    { id: 'araimasu', fr: 'laver', frAlternatives: ['se laver'], kana: 'あらいます' },
    {
      id: 'sanposhimasu',
      fr: 'se promener',
      frAlternatives: ['promener', 'faire une promenade'],
      kana: 'さんぽします',
    },
    { id: 'akemasu', fr: 'ouvrir', kana: 'あけます', kanji: '開けます' },
    { id: 'shimemasu', fr: 'fermer', kana: 'しめます', kanji: '閉めます' },
    { id: 'hashirimasu', fr: 'courir', kana: 'はしります', kanji: '走ります' },
    { id: 'tsukemasu', fr: 'allumer', kana: 'つけます' },
    { id: 'okimasu', fr: 'poser', frAlternatives: ['mettre', 'placer'], kana: 'おきます' },
    {
      id: 'iremasu',
      fr: 'mettre dedans',
      frAlternatives: ['mettre', 'ranger', 'mettre dans'],
      kana: 'いれます',
    },
    { id: 'dashimasu', fr: 'sortir (quelque chose)', frAlternatives: ['sortir'], kana: 'だします' },
    {
      id: 'norimasu',
      fr: 'monter (dans un véhicule)',
      frAlternatives: ['monter', 'prendre (le train)'],
      kana: 'のります',
      note: 'Avec に : でんしゃに のります.',
    },
    {
      id: 'orimasu',
      fr: 'descendre (d’un véhicule)',
      frAlternatives: ['descendre'],
      kana: 'おります',
      note: 'Avec を : でんしゃを おります.',
    },
  ],
};

export default module;
