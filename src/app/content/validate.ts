import { isKana } from './kana';
import { StudyModule } from './module.model';

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

function isRealDate(value: string): boolean {
  const match = ISO_DATE.exec(value);
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

const blank = (text: string | undefined) => text !== undefined && text.trim() === '';

/**
 * Fautes de saisie d'un module, en clair ; liste vide si le module est correct.
 * Lancé sur tous les modules par `content.spec.ts`, pour qu'une faute casse `npm test`, pas l'écran.
 */
export function validateModule(module: StudyModule): string[] {
  const errors: string[] = [];
  const at = `module « ${module.id} »`;

  if (!KEBAB_CASE.test(module.id)) errors.push(`${at} : id invalide (kebab-case attendu)`);
  if (!isRealDate(module.lessonDate)) errors.push(`${at} : date « ${module.lessonDate} » invalide`);
  if (blank(module.title)) errors.push(`${at} : titre vide`);
  if (blank(module.summary)) errors.push(`${at} : résumé vide`);

  const vocabulary = module.vocabulary ?? [];
  const exercises = module.exercises ?? [];
  if (vocabulary.length === 0 && exercises.length === 0) {
    errors.push(`${at} : aucune question (ni vocabulaire ni exercice)`);
  }

  const ids = new Set<string>();
  const claim = (id: string) => {
    if (!KEBAB_CASE.test(id)) errors.push(`${at} : id « ${id} » invalide (kebab-case attendu)`);
    if (ids.has(id)) errors.push(`${at} : id « ${id} » en double`);
    ids.add(id);
  };

  for (const word of vocabulary) {
    claim(word.id);
    if (blank(word.fr)) errors.push(`${at}, mot « ${word.id} » : français vide`);
    if (!isKana(word.kana))
      errors.push(`${at}, mot « ${word.id} » : « ${word.kana} » n'est pas en kana`);
    if (blank(word.kanji)) errors.push(`${at}, mot « ${word.id} » : kanji vide`);
    if (word.frAlternatives?.some(blank)) errors.push(`${at}, mot « ${word.id} » : variante vide`);
  }

  for (const exercise of exercises) {
    claim(exercise.id);
    const where = `${at}, exercice « ${exercise.id} »`;
    if (blank(exercise.prompt)) errors.push(`${where} : consigne vide`);
    if (exercise.answers.length === 0) errors.push(`${where} : aucune réponse`);
    if (exercise.answers.some(blank)) errors.push(`${where} : réponse vide`);
    if (new Set(exercise.answers).size !== exercise.answers.length) {
      errors.push(`${where} : réponse en double`);
    }
    if (exercise.answerLang === 'ja' && !exercise.answers.some((answer) => isKana(answer))) {
      errors.push(`${where} : aucune réponse en kana (le rōmaji ne pourrait jamais être accepté)`);
    }
  }

  for (const section of module.sheet ?? []) {
    if (
      blank(section.heading) ||
      section.paragraphs.length === 0 ||
      section.paragraphs.some(blank)
    ) {
      errors.push(`${at} : section de fiche vide`);
    }
  }

  return errors;
}
