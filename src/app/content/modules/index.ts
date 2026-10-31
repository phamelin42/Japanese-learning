import { ModuleEntry } from '../module.model';

/**
 * Tous les modules, chargés à la demande. Un nouveau module s'ajoute ici et dans son fichier ;
 * `content.spec.ts` vérifie que les deux descriptions sont identiques.
 */
export const MODULES: readonly ModuleEntry[] = [
  {
    id: 'jours-de-la-semaine',
    title: 'Jours de la semaine',
    kind: 'vocabulaire',
    lessonDate: '2026-10-30',
    summary: 'Les sept jours, de lundi à dimanche, et comment demander quel jour on est.',
    load: () => import('./jours-de-la-semaine').then((m) => m.default),
  },
  {
    id: 'directions-et-lieux',
    title: 'Directions et lieux',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Gauche, droite, les points cardinaux, les positions et les lieux de la ville.',
    load: () => import('./directions-et-lieux').then((m) => m.default),
  },
  {
    id: 'le-temps',
    title: 'Le temps',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Matin, soir, avant-hier, après-demain, semaine et année prochaine ou dernière.',
    load: () => import('./le-temps').then((m) => m.default),
  },
  {
    id: 'vetements-et-accessoires',
    title: 'Vêtements et accessoires',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Veste, pantalon, gants, chaussettes, lunettes et motifs.',
    load: () => import('./vetements-et-accessoires').then((m) => m.default),
  },
  {
    id: 'cuisine-et-sushi',
    title: 'Cuisine et sushi',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Crevette, thon, dorade, poivre, chef de sushi et cuisine japonaise.',
    load: () => import('./cuisine-et-sushi').then((m) => m.default),
  },
  {
    id: 'maison-et-objets',
    title: 'La maison et les objets',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Cuisine, étagère, vase, dictionnaire, magazine, timbre et vélo.',
    load: () => import('./maison-et-objets').then((m) => m.default),
  },
  {
    id: 'adjectifs',
    title: 'Adjectifs',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Les adjectifs en い et en な du cours : jeune, beau, lourd, gentil, pratique…',
    load: () => import('./adjectifs').then((m) => m.default),
  },
  {
    id: 'mots-divers',
    title: 'Mots et expressions divers',
    kind: 'vocabulaire',
    lessonDate: '2026-10-31',
    summary: 'Elle, pied, cheveux, rentrer, exactement, pêche, natation et deux expressions.',
    load: () => import('./mots-divers').then((m) => m.default),
  },
  {
    id: 'il-y-a-arimasu-imasu',
    title: 'Il y a : あります et います',
    kind: 'lecon',
    lessonDate: '2026-10-31',
    summary:
      'Dire qu’il y a quelque chose ou quelqu’un, et où : あります, います et les positions.',
    load: () => import('./il-y-a-arimasu-imasu').then((m) => m.default),
  },
  {
    id: 'adjectifs-i-et-na-relies',
    title: 'Relier les adjectifs en い et en な',
    kind: 'lecon',
    lessonDate: '2026-10-31',
    summary: 'Mettre plusieurs adjectifs dans la même phrase : やすくて, しんせつで…',
    load: () => import('./adjectifs-i-et-na-relies').then((m) => m.default),
  },
];
