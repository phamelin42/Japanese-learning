import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'donner-et-recevoir',
  title: 'Donner, recevoir, prêter…',
  kind: 'vocabulaire',
  lessonDate: '2026-11-19',
  summary:
    'Les verbes qui vont avec に : donner, recevoir, prêter, emprunter, enseigner, apprendre…',
  vocabulary: [
    {
      id: 'agemasu',
      fr: 'donner',
      frAlternatives: ['offrir'],
      kana: 'あげます',
      note: 'Pas quand on me donne, à moi ou à ma famille : on dit alors くれます.',
    },
    {
      id: 'kuremasu',
      fr: 'me donner',
      frAlternatives: ['donner (à moi)', 'on me donne', 'm’offrir'],
      kana: 'くれます',
      note: 'Seulement quand celui qui reçoit est moi ou quelqu’un de ma famille.',
    },
    { id: 'moraimasu', fr: 'recevoir', kana: 'もらいます' },
    { id: 'kashimasu', fr: 'prêter', kana: 'かします', kanji: '貸します' },
    { id: 'karimasu', fr: 'emprunter', kana: 'かります', kanji: '借ります' },
    { id: 'oshiemasu', fr: 'enseigner', frAlternatives: ['apprendre à'], kana: 'おしえます' },
    {
      id: 'naraimasu',
      fr: 'apprendre',
      frAlternatives: ['apprendre auprès de'],
      kana: 'ならいます',
      kanji: '習います',
      note: 'Apprendre auprès de quelqu’un : せんせいに ならいます.',
    },
    { id: 'okurimasu', fr: 'envoyer', kana: 'おくります', kanji: '送ります' },
    {
      id: 'kakemasu',
      fr: 'appeler (téléphoner)',
      frAlternatives: ['appeler', 'téléphoner'],
      kana: 'かけます',
      note: 'でんわを かけます : passer un coup de téléphone.',
    },
    { id: 'kakimasu', fr: 'écrire', kana: 'かきます', kanji: '書きます' },
  ],
};

export default module;
