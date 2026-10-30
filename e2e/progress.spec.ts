import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

test('un module marqué terminé le reste après rechargement, sans erreur d’hydratation', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await openPage(page, '/module/jours-de-la-semaine');
  await page.getByText('Module terminé').click();
  await expect(page.getByRole('switch', { name: 'Module terminé' })).toBeChecked();

  await openPage(page, '/');
  const card = page.getByRole('link', { name: /Jours de la semaine/ });
  await expect(card).toContainText('Terminé');

  await page.reload();
  await expect(card).toContainText('Terminé');
  await page.getByText('À faire').click();
  await expect(card).toBeHidden();
  expect(errors).toEqual([]);
});
