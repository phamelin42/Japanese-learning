export type ModuleKind = 'vocabulaire' | 'lecon';

export interface VocabularyItem {
  /** Stable, kebab-case, unique dans le module : la progression s'y rattache. */
  id: string;
  /** Libellé affiché et réponse française principale. */
  fr: string;
  frAlternatives?: readonly string[];
  /** Hiragana ou katakana : réponse japonaise principale. */
  kana: string;
  /** Accepté aussi en réponse ; affiché avec les kana dans le sens japonais → français. */
  kanji?: string;
  note?: string;
}

export interface SheetExample {
  ja: string;
  kana?: string;
  fr: string;
}

export interface SheetSection {
  heading: string;
  paragraphs: readonly string[];
  examples?: readonly SheetExample[];
}

export interface Exercise {
  id: string;
  /** Consigne et phrase ; « ＿＿ » marque le trou. */
  prompt: string;
  promptLang: 'fr' | 'ja';
  /** Toutes acceptées ; la première est affichée comme corrigé. */
  answers: readonly string[];
  answerLang: 'fr' | 'ja';
  /** Affichée seulement après l'envoi. */
  explanation?: string;
}

export interface StudyModule {
  id: string;
  title: string;
  kind: ModuleKind;
  /** Date du cours, AAAA-MM-JJ. */
  lessonDate: string;
  summary: string;
  sheet?: readonly SheetSection[];
  vocabulary?: readonly VocabularyItem[];
  exercises?: readonly Exercise[];
}

/** Ce que l'accueil connaît d'un module sans charger son contenu. */
export interface ModuleEntry {
  id: string;
  title: string;
  kind: ModuleKind;
  lessonDate: string;
  summary: string;
  load: () => Promise<StudyModule>;
}
