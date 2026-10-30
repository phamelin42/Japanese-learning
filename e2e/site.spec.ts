import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

test('les icônes d’onglet répondent et sont déclarées', async ({ page, request }) => {
  for (const file of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
    const response = await request.get(file);
    expect(response.ok(), file).toBe(true);
  }
  await page.goto('/');
  await expect(page.locator('link[rel="icon"][href="favicon.svg"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
});

test('chaque page a son titre et sa description dans le HTML pré-rendu', async ({ request }) => {
  const html = await (await request.get('/reglages')).text();
  expect(html).toContain('<title>Réglages · Apprendre le japonais</title>');
  expect(html).toContain('content="Thème d’affichage et synchronisation de la progression."');
  expect(html).toContain('<h1 class="app-page__title title-1">Réglages</h1>');
});

test('le sitemap liste les pages indexables, sans la 404', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).toContain('<loc>https://japanese-learning.phamelin.fr/</loc>');
  expect(xml).toContain('<loc>https://japanese-learning.phamelin.fr/reglages</loc>');
  expect(xml).not.toContain('404');
});

test('une adresse inconnue répond 404 avec la page introuvable', async ({ page }) => {
  const response = await page.goto('/nulle-part');
  expect(response?.status()).toBe(404);
  await openPage(page, '/nulle-part');
  await expect(page.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeVisible();
});

test('le thème Nuit choisi est rétabli au rechargement', async ({ page }) => {
  await openPage(page, '/reglages');
  await page.getByText('Thème Nuit').click();
  await expect(page.getByRole('switch', { name: 'Thème Nuit' })).toBeChecked();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('le lien d’évitement mène au contenu principal', async ({ page }) => {
  await openPage(page, '/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Aller au contenu' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#contenu')).toBeFocused();
});
