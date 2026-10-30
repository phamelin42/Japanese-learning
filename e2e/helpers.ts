import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

export type Theme = 'light' | 'dark';

/** Ouvre une page dans le thème voulu, mouvement réduit, et attend la fin de l'hydratation. */
export async function openPage(page: Page, path: string, theme: Theme = 'light'): Promise<void> {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  if (theme === 'dark') {
    await page.addInitScript(() => localStorage.setItem('fuda-theme', 'dark'));
  }
  await page.goto(path);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

/** axe WCAG 2.2 AA, une fois qu'aucune animation n'est en cours (sinon il lit des couleurs interpolées). */
export async function expectNoAxeViolations(page: Page): Promise<void> {
  await page.waitForFunction(() =>
    document.getAnimations().every((animation) => animation.playState !== 'running'),
  );
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(violations.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
}
