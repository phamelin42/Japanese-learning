import { StudyModule } from '../module.model';

const module: StudyModule = {
  id: 'fournitures-et-courrier',
  title: 'Fournitures, courrier et objets',
  kind: 'vocabulaire',
  lessonDate: '2026-11-19',
  summary: 'Lettre, colis, par avion, par bateau, gomme, ciseaux, scotch, baguettes, portable…',
  vocabulary: [
    {
      id: 'tegami',
      fr: 'lettre (courrier)',
      frAlternatives: ['lettre', 'courrier'],
      kana: 'てがみ',
      kanji: '手紙',
    },
    {
      id: 'ji',
      fr: 'lettre (caractère)',
      frAlternatives: ['caractère', 'caractères', 'lettres', 'écriture'],
      kana: 'じ',
      kanji: '字',
    },
    { id: 'nimotsu', fr: 'colis', frAlternatives: ['paquet', 'bagage', 'bagages'], kana: 'にもつ' },
    {
      id: 'eamee-ru',
      fr: 'par avion',
      frAlternatives: ['avion', 'courrier par avion', 'air mail'],
      kana: 'エアメール',
      note: 'エアメールで おくります : envoyer par avion.',
    },
    {
      id: 'funabin',
      fr: 'par bateau',
      frAlternatives: ['bateau', 'courrier par bateau'],
      kana: 'ふなびん',
      kanji: '船便',
      note: 'ふなびんで おくります : envoyer par bateau, moins cher mais plus lent.',
    },
    { id: 'okane', fr: 'argent', kana: 'おかね', kanji: 'お金' },
    {
      id: 'genkin',
      fr: 'espèces',
      frAlternatives: ['argent liquide', 'liquide'],
      kana: 'げんきん',
      kanji: '現金',
    },
    {
      id: 'keshigomu',
      fr: 'gomme',
      kana: 'けしゴム',
      note: 'Littéralement « caoutchouc à effacer ».',
    },
    { id: 'hasami', fr: 'ciseaux', kana: 'はさみ' },
    { id: 'teepu', fr: 'scotch', frAlternatives: ['ruban adhésif', 'adhésif'], kana: 'テープ' },
    {
      id: 'kami-papier',
      fr: 'feuille (de papier)',
      frAlternatives: ['feuille', 'papier'],
      kana: 'かみ',
      kanji: '紙',
      note: 'Même son que かみ (cheveux), avec un autre kanji.',
    },
    { id: 'hashi', fr: 'baguettes', kana: 'はし', kanji: '箸' },
    {
      id: 'keitai',
      fr: 'téléphone portable',
      frAlternatives: ['portable', 'smartphone', 'mobile'],
      kana: 'けいたい',
      note: 'Abréviation de けいたいでんわ ; on dit aussi スマホ pour un smartphone.',
    },
    { id: 'hocchikisu', fr: 'agrafeuse', kana: 'ホッチキス' },
    {
      id: 'kusuri',
      fr: 'médicament',
      frAlternatives: ['médicaments'],
      kana: 'くすり',
      kanji: '薬',
    },
  ],
};

export default module;
