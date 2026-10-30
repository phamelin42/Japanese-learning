// Hiragana, katakana, trait d'allongement, point médian et espaces (y compris l'espace pleine
// chasse) : ce qu'un clavier japonais produit pour une lecture. Les katakana demi-chasse en sont
// exclus (NFKC d'abord). Plages écrites en points de code : un espace pleine chasse littéral
// serait invisible à la relecture.
const char = (codePoint: number) => String.fromCodePoint(codePoint);
const HIRAGANA_RANGE = `${char(0x3041)}-${char(0x3096)}`;
const KATAKANA_RANGE = `${char(0x30a1)}-${char(0x30fa)}`;
const EXTRAS = `${char(0x30fc)}${char(0x30fb)}${char(0x3000)}`;
const KANA = new RegExp(`^[${HIRAGANA_RANGE}${KATAKANA_RANGE}${EXTRAS}\\s]+$`, 'u');
const KATAKANA = new RegExp(`[${char(0x30a1)}-${char(0x30f6)}]`, 'gu');
const KATAKANA_TO_HIRAGANA = 0x60;

export function isKana(text: string): boolean {
  return text.trim() !== '' && KANA.test(text);
}

export function katakanaToHiragana(text: string): string {
  return text.replace(KATAKANA, (char) =>
    String.fromCharCode(char.charCodeAt(0) - KATAKANA_TO_HIRAGANA),
  );
}
