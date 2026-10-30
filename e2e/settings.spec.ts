import { expect, test, type Page } from '@playwright/test';
import { expectNoAxeViolations, openPage } from './helpers';

const EMPTY = { version: 1, modules: {} };

/** Simule /api/progress : aucun appel réseau réel pendant les tests. */
async function mockApi(page: Page, status: number): Promise<void> {
  await page.route('**/api/progress', async (route) => {
    const body = status === 200 ? (route.request().postData() ?? JSON.stringify(EMPTY)) : '{}';
    await route.fulfill({ status, contentType: 'application/json', body });
  });
}

async function saveCode(page: Page, code: string): Promise<void> {
  await page.getByLabel('Code de synchronisation').fill(code);
  await page.getByRole('button', { name: 'Enregistrer', exact: true }).click();
}

for (const theme of ['light', 'dark'] as const) {
  test(`synchronisation réussie, puis code oublié après confirmation (${theme})`, async ({
    page,
  }) => {
    await mockApi(page, 200);
    await openPage(page, '/reglages', theme);
    await saveCode(page, 'ma phrase secrète');
    await expect(page.getByRole('status')).toContainText(/Synchronisé à \d{1,2} h \d{2}/);
    await expectNoAxeViolations(page);

    await page.getByRole('button', { name: 'Oublier ce code sur cet appareil' }).click();
    const dialog = page.getByRole('alertdialog', { name: 'Oublier le code sur cet appareil ?' });
    await expect(dialog).toBeVisible();
    await expectNoAxeViolations(page);
    await dialog.getByRole('button', { name: 'Oublier le code', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole('status')).toContainText('la progression reste sur cet appareil');
  });

  test(`code refusé par le serveur (${theme})`, async ({ page }) => {
    await mockApi(page, 401);
    await openPage(page, '/reglages', theme);
    await saveCode(page, 'mauvais code');
    await expect(page.getByRole('status')).toContainText('Code refusé');
    await expectNoAxeViolations(page);
  });
}

test('la progression part au serveur après un changement', async ({ page }) => {
  const sent: unknown[] = [];
  await page.route('**/api/progress', async (route) => {
    if (route.request().method() === 'PUT') sent.push(route.request().postDataJSON());
    const body = route.request().postData() ?? JSON.stringify(EMPTY);
    await route.fulfill({ status: 200, contentType: 'application/json', body });
  });
  await openPage(page, '/reglages');
  await saveCode(page, 'ma phrase secrète');
  await expect(page.getByRole('status')).toContainText('Synchronisé');

  await openPage(page, '/module/jours-de-la-semaine');
  await page.getByText('Module terminé').click();
  await expect
    .poll(() => sent.some((doc) => JSON.stringify(doc).includes('"done":true')), {
      timeout: 10_000,
    })
    .toBe(true);
});
