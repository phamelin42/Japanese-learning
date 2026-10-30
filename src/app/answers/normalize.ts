// Ponctuation qu'un clavier de téléphone ajoute en fin de saisie (point automatique, 。, ！…).
const EDGE_PUNCTUATION = /^[\s.,;:!?…。、]+|[\s.,;:!?…。、]+$/gu;
const APOSTROPHES = /[’‘ʼ`´]/gu;

/**
 * Réponse japonaise comparable : NFKC (katakana demi-chasse et alphabet pleine chasse ramenés à la
 * forme courante), minuscules, apostrophes unifiées, sans espace ni ponctuation aux bords.
 */
export function normalizeJapanese(input: string): string {
  return input
    .normalize('NFKC')
    .toLowerCase()
    .replace(APOSTROPHES, "'")
    .replace(EDGE_PUNCTUATION, '')
    .replace(/\s+/gu, '');
}

const LEADING_ARTICLE = /^(?:(?:le|la|les|un|une|des)\s+|l')/u;

/**
 * Réponse française comparable : sans accents ni majuscules, apostrophes unifiées, espaces
 * fusionnés, sans ponctuation aux bords ni article initial (« le téléphone » vaut « téléphone »).
 */
export function normalizeFrench(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(APOSTROPHES, "'")
    .replace(EDGE_PUNCTUATION, '')
    .replace(/\s+/gu, ' ')
    .replace(LEADING_ARTICLE, '');
}
