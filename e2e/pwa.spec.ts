import { expect, test, type APIRequestContext } from '@playwright/test';

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

interface Manifest {
  name: string;
  short_name: string;
  lang: string;
  start_url: string;
  scope: string;
  display: string;
  theme_color: string;
  background_color: string;
  icons: ManifestIcon[];
}

async function loadManifest(request: APIRequestContext): Promise<Manifest> {
  const response = await request.get('manifest.webmanifest');
  expect(response.ok()).toBe(true);
  return (await response.json()) as Manifest;
}

/** Largeur et hauteur lues dans l'en-tête PNG (octets 16 à 23, après la signature et « IHDR »). */
function pngSize(bytes: Buffer): string {
  return `${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`;
}

test('la page déclare le manifeste et la couleur de la barre du téléphone', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    'manifest.webmanifest',
  );
  const manifest = await loadManifest(page.request);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    'content',
    manifest.theme_color,
  );
});

test('le manifeste permet d’installer l’application en plein écran', async ({ request }) => {
  const manifest = await loadManifest(request);
  expect(manifest).toMatchObject({
    name: 'Apprendre le japonais',
    lang: 'fr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
  });
  expect(manifest.short_name.length).toBeGreaterThan(0);
  expect(manifest.short_name.length).toBeLessThanOrEqual(12);
  expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
  expect(manifest.background_color).toMatch(/^#[0-9a-f]{6}$/i);
});

test('chaque icône du manifeste existe et a la taille annoncée', async ({ request }) => {
  const { icons } = await loadManifest(request);
  for (const icon of icons) {
    const response = await request.get(icon.src);
    expect(response.ok(), icon.src).toBe(true);
    expect(icon.type, icon.src).toBe('image/png');
    expect(pngSize(await response.body()), icon.src).toBe(icon.sizes);
  }
});

test('le manifeste fournit les icônes exigées par Chrome et Android', async ({ request }) => {
  const { icons } = await loadManifest(request);
  const has = (sizes: string, purpose: string) =>
    icons.some((icon) => icon.sizes === sizes && (icon.purpose ?? 'any') === purpose);
  expect(has('192x192', 'any')).toBe(true);
  expect(has('512x512', 'any')).toBe(true);
  expect(has('512x512', 'maskable')).toBe(true);
});
