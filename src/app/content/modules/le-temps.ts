import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'le-temps',
  title: 'Le temps',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Matin, soir, avant-hier, après-demain, semaine et année prochaine ou dernière.',
  vocabulary: [
    { id: 'asa', fr: 'matin', kana: 'あさ' },
    { id: 'kesa', fr: 'ce matin', kana: 'けさ' },
    {
      id: 'yuugata',
      fr: 'début de soirée',
      frAlternatives: ['soir', 'soirée', 'fin d’après-midi'],
      kana: 'ゆうがた',
    },
    { id: 'ototoi', fr: 'avant-hier', kana: 'おととい' },
    { id: 'asatte', fr: 'après-demain', kana: 'あさって' },
    { id: 'senshuu', fr: 'semaine dernière', kana: 'せんしゅう' },
    { id: 'raishuu', fr: 'semaine prochaine', kana: 'らいしゅう' },
    { id: 'rainen', fr: 'année prochaine', frAlternatives: ['l’an prochain'], kana: 'らいねん' },
  ],
};

export default module;
