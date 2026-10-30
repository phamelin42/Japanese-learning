import { expect, test, type Page } from '@playwright/test';
import jours from '../src/app/content/modules/jours-de-la-semaine';
import { expectNoAxeViolations, openPage, type Theme } from './helpers';

const PRACTICE = '/module/jours-de-la-semaine/entrainement';

// Invite affichée → bonne réponse, dans les deux sens.
const solutions = new Map(
  jours.vocabulary!.flatMap((word) => [
    [word.fr, word.kana],
    [word.kanji ?? word.kana, word.fr],
  ]),
);

const field = (page: Page) => page.getByRole('textbox', { name: 'Ta réponse' });
const prompt = (page: Page) => page.locator('.app-practice__prompt');

async function startPractice(page: Page, theme: Theme = 'light'): Promise<void> {
  await openPage(page, PRACTICE, theme);
  await expect(field(page)).toBeVisible();
}

async function answer(page: Page, text: string): Promise<void> {
  await field(page).fill(text);
  await field(page).press('Enter');
}

/** « Suivant » au clavier, puis attente que la question suivante (ou la fin) soit affichée. */
async function goNext(page: Page): Promise<void> {
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Suivant', exact: true })).toBeHidden();
}

test('une série complète au clavier, une faute revenant en fin de série', async ({ page }) => {
  await startPractice(page);
  const missed = (await prompt(page).textContent())!.trim();

  await answer(page, 'zzz');
  await expect(page.getByText('Pas tout à fait')).toBeVisible();
  const next = page.getByRole('button', { name: 'Suivant', exact: true });
  await expect(next).toBeFocused();
  await goNext(page);
  await expect(field(page)).toBeFocused();

  const seen: string[] = [];
  while (await field(page).isVisible()) {
    const shown = (await prompt(page).textContent())!.trim();
    seen.push(shown);
    await answer(page, solutions.get(shown)!);
    await expect(page.getByText('Juste !')).toBeVisible();
    await goNext(page);
  }

  expect(seen.at(-1)).toBe(missed);
  await expect(page.getByRole('heading', { name: 'Série terminée' })).toBeFocused();
  await expect(page.getByText('15 sur 16 du premier coup')).toBeVisible();
});

test('la page module mène à l’entraînement', async ({ page }) => {
  await openPage(page, '/');
  await page.getByRole('link', { name: /Jours de la semaine/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Jours de la semaine' })).toBeVisible();
  await page.getByRole('link', { name: 'S’entraîner' }).click();
  await expect(field(page)).toBeVisible();
});

test('un module inconnu affiche la page introuvable', async ({ page }) => {
  await openPage(page, '/module/nulle-part');
  await expect(page.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeVisible();
});

/** « Suivant » à la souris, puis attente que la question suivante (ou la fin) soit affichée. */
async function clickNext(page: Page): Promise<void> {
  const next = page.getByRole('button', { name: 'Suivant', exact: true });
  await next.click();
  await expect(next).toBeHidden();
}

/** Répond juste à la question affichée, à la souris. */
async function answerShownQuestion(page: Page): Promise<void> {
  await field(page).fill(solutions.get((await prompt(page).textContent())!.trim())!);
  await page.getByRole('button', { name: 'Valider', exact: true }).click();
  await expect(page.getByText('Juste !')).toBeVisible();
}

for (const theme of ['light', 'dark'] as const) {
  test(`axe sur chaque état de l’entraînement (${theme})`, async ({ page }) => {
    await startPractice(page, theme);
    await expectNoAxeViolations(page);

    await field(page).fill('zzz');
    await page.getByRole('button', { name: 'Valider', exact: true }).click();
    await expect(page.getByText('Pas tout à fait')).toBeVisible();
    await expectNoAxeViolations(page);
    await clickNext(page);

    await answerShownQuestion(page);
    await expectNoAxeViolations(page);
    await clickNext(page);

    const done = page.getByRole('heading', { name: 'Série terminée' });
    for (let guard = 0; guard < 20 && !(await done.isVisible()); guard++) {
      await answerShownQuestion(page);
      await clickNext(page);
    }
    await expect(done).toBeVisible();
    await expectNoAxeViolations(page);
  });
}

test('les pages de module s’hydratent sans erreur', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await startPractice(page);
  await openPage(page, '/module/jours-de-la-semaine');
  expect(errors).toEqual([]);
});
