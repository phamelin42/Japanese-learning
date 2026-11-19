import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'meteo',
  title: 'La météo',
  kind: 'vocabulaire',
  lessonDate: '2026-11-19',
  summary: 'Pluie, neige, nuageux, beau temps, chaud et froid.',
  vocabulary: [
    { id: 'ame', fr: 'pluie', kana: 'あめ', kanji: '雨' },
    { id: 'yuki', fr: 'neige', kana: 'ゆき', kanji: '雪' },
    {
      id: 'kumori',
      fr: 'nuageux',
      frAlternatives: ['temps nuageux', 'nuages', 'couvert'],
      kana: 'くもり',
      kanji: '曇り',
    },
    {
      id: 'hare',
      fr: 'beau temps',
      frAlternatives: ['ensoleillé', 'temps ensoleillé', 'soleil'],
      kana: 'はれ',
      kanji: '晴れ',
    },
    {
      id: 'atatakai',
      fr: 'chaud (doux)',
      frAlternatives: ['chaud', 'doux', 'tiède'],
      kana: 'あたたかい',
      kanji: '暖かい',
      note: 'Une chaleur agréable ; pour « il fait très chaud », on dit あつい.',
    },
    { id: 'samui', fr: 'froid', frAlternatives: ['il fait froid'], kana: 'さむい', kanji: '寒い' },
  ],
};

export default module;
