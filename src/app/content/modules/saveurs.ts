import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'saveurs',
  title: 'Les saveurs',
  kind: 'vocabulaire',
  lessonDate: '2026-11-19',
  summary: 'Sucré, acide, épicé, amer, salé, fort en goût ou fade.',
  vocabulary: [
    { id: 'amai', fr: 'sucré', frAlternatives: ['sucrée', 'doux'], kana: 'あまい', kanji: '甘い' },
    { id: 'suppai', fr: 'acide', frAlternatives: ['aigre'], kana: 'すっぱい' },
    {
      id: 'karai',
      fr: 'épicé',
      frAlternatives: ['épicée', 'piquant', 'pimenté'],
      kana: 'からい',
      kanji: '辛い',
      note: 'Adjectif en い. Selon les régions, からい veut aussi dire « salé ».',
    },
    {
      id: 'koi',
      fr: 'fort en goût',
      frAlternatives: ['fort', 'corsé', 'concentré'],
      kana: 'こい',
      kanji: '濃い',
      note: 'Le contraire de うすい (léger, fade).',
    },
    { id: 'nigai', fr: 'amer', frAlternatives: ['amère'], kana: 'にがい', kanji: '苦い' },
    {
      id: 'usui-gout',
      fr: 'fade',
      frAlternatives: ['goût léger', 'léger', 'léger en goût'],
      kana: 'うすい',
      kanji: '薄い',
      note: 'Même mot que うすい (fin, peu épais) : « léger » en goût comme en épaisseur.',
    },
    { id: 'shoppai', fr: 'salé', frAlternatives: ['salée'], kana: 'しょっぱい' },
  ],
};

export default module;
