import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'jours-de-la-semaine',
  title: 'Jours de la semaine',
  kind: 'vocabulaire',
  lessonDate: '2026-10-30',
  summary: 'Les sept jours, de lundi à dimanche, et comment demander quel jour on est.',
  sheet: [
    {
      heading: 'Un élément par jour',
      paragraphs: [
        'Chaque jour se termine par 曜日 (ようび), « jour de la semaine ». Le premier kanji nomme un astre ou un élément : la lune, le feu, l’eau, le bois, le métal, la terre, le soleil.',
        'Pour demander le jour, on remplace l’élément par 何 (なん), « quoi ».',
      ],
      examples: [
        {
          ja: '今日は何曜日ですか。',
          kana: 'きょうはなんようびですか。',
          fr: 'Quel jour sommes-nous ?',
        },
        { ja: '今日は月曜日です。', kana: 'きょうはげつようびです。', fr: 'Nous sommes lundi.' },
      ],
    },
  ],
  vocabulary: [
    { id: 'lundi', fr: 'lundi', kana: 'げつようび', kanji: '月曜日', note: '月 : la lune' },
    { id: 'mardi', fr: 'mardi', kana: 'かようび', kanji: '火曜日', note: '火 : le feu' },
    { id: 'mercredi', fr: 'mercredi', kana: 'すいようび', kanji: '水曜日', note: '水 : l’eau' },
    { id: 'jeudi', fr: 'jeudi', kana: 'もくようび', kanji: '木曜日', note: '木 : le bois' },
    {
      id: 'vendredi',
      fr: 'vendredi',
      kana: 'きんようび',
      kanji: '金曜日',
      note: '金 : le métal, l’or',
    },
    { id: 'samedi', fr: 'samedi', kana: 'どようび', kanji: '土曜日', note: '土 : la terre' },
    { id: 'dimanche', fr: 'dimanche', kana: 'にちようび', kanji: '日曜日', note: '日 : le soleil' },
    {
      id: 'quel-jour',
      fr: 'quel jour (de la semaine)',
      frAlternatives: ['quel jour', 'quel jour de la semaine'],
      kana: 'なんようび',
      kanji: '何曜日',
    },
  ],
};

export default module;
