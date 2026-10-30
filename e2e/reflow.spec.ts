import { expect, test } from '@playwright/test';
import { openPage } from './helpers';
import { auditedPaths } from './routes';

test.use({ viewport: { width: 320, height: 640 } });

for (const path of auditedPaths()) {
  test(`aucun défilement horizontal à 320 px : ${path}`, async ({ page }) => {
    await openPage(page, path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
