import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'mots-utiles',
  title: 'Mots utiles',
  kind: 'vocabulaire',
  lessonDate: '2026-11-19',
  summary: 'Mais, donc, malade, bon, temps, anniversaire, université, petit ami.',
  vocabulary: [
    {
      id: 'desuga',
      fr: 'mais',
      frAlternatives: ['cependant'],
      kana: 'ですが',
      note: 'Forme polie de « mais » ; à l’oral, でも est plus courant.',
    },
    {
      id: 'kara',
      fr: 'donc (parce que)',
      frAlternatives: ['donc', 'parce que', 'car'],
      kana: 'から',
      note: 'Après la cause : たかいですから、かいません (c’est cher, donc je n’achète pas).',
    },
    { id: 'byouki', fr: 'malade', frAlternatives: ['maladie'], kana: 'びょうき', kanji: '病気' },
    {
      id: 'yoi',
      fr: 'bon',
      frAlternatives: ['bien', 'bonne'],
      kana: 'よい',
      kanji: '良い',
      note: 'Forme écrite ou soignée de いい.',
    },
    {
      id: 'jikan',
      fr: 'temps (durée)',
      frAlternatives: ['temps', 'durée', 'heure'],
      kana: 'じかん',
      kanji: '時間',
    },
    { id: 'tanjoubi', fr: 'anniversaire', kana: 'たんじょうび', kanji: '誕生日' },
    {
      id: 'daigaku',
      fr: 'université',
      frAlternatives: ['fac', 'faculté'],
      kana: 'だいがく',
      kanji: '大学',
    },
    {
      id: 'kareshi',
      fr: 'copain',
      frAlternatives: ['petit ami', 'petit copain'],
      kana: 'かれし',
      kanji: '彼氏',
      note: 'Sa copine : かのじょ.',
    },
  ],
};

export default module;
