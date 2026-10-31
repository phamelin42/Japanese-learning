import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'mots-divers',
  title: 'Mots et expressions divers',
  kind: 'vocabulaire',
  lessonDate: '2026-10-31',
  summary: 'Elle, pied, cheveux, rentrer, exactement, pêche, natation et deux expressions.',
  vocabulary: [
    {
      id: 'kanojo',
      fr: 'elle',
      frAlternatives: ['petite amie', 'sa petite amie', 'copine'],
      kana: 'かのじょ',
    },
    { id: 'ashi', fr: 'pied', frAlternatives: ['jambe'], kana: 'あし' },
    { id: 'kami', fr: 'cheveux', frAlternatives: ['cheveu'], kana: 'かみ' },
    {
      id: 'kaerimasu',
      fr: 'rentrer',
      frAlternatives: ['je rentre', 'rentre'],
      kana: 'かえります',
      note: 'Forme polie de かえる (rentrer chez soi).',
    },
    { id: 'choudo', fr: 'exactement', frAlternatives: ['juste', 'pile'], kana: 'ちょうど' },
    { id: 'tsuri', fr: 'pêche', frAlternatives: ['pêche à la ligne'], kana: 'つり' },
    { id: 'suiei', fr: 'natation', kana: 'すいえい' },
    {
      id: 'yorokonde',
      fr: 'avec plaisir',
      kana: 'よろこんで',
      note: 'Forme en て de よろこぶ (se réjouir) : réponse polie à une invitation.',
    },
    {
      id: 'shimashou',
      fr: 'faisons',
      frAlternatives: ['allons-y', 'si on faisait'],
      kana: 'しましょう',
      note: 'Forme en ましょう de する : une proposition (« faisons… »).',
    },
  ],
};

export default module;
