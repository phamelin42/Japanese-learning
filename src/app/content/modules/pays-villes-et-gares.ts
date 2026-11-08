import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'pays-villes-et-gares',
  title: 'Pays, villes et gares',
  kind: 'vocabulaire',
  lessonDate: '2026-11-08',
  summary: 'Pays, Rome, Berlin, Londres, gare et gare de Tokyo.',
  vocabulary: [
    { id: 'kuni', fr: 'pays', kana: 'くに' },
    { id: 'roma', fr: 'Rome', kana: 'ローマ' },
    { id: 'berurin', fr: 'Berlin', kana: 'ベルリン' },
    { id: 'rondon', fr: 'Londres', kana: 'ロンドン' },
    { id: 'eki', fr: 'gare', kana: 'えき' },
    {
      id: 'toukyou-eki',
      fr: 'gare de Tokyo',
      kana: 'とうきょうえき',
      note: 'Pas de の entre le nom de la ville et えき.',
    },
  ],
};

export default module;
