import { test } from '@playwright/test';
import { expectNoAxeViolations, openPage } from './helpers';
import { auditedPaths } from './routes';

for (const theme of ['light', 'dark'] as const) {
  for (const path of auditedPaths()) {
    test(`axe sans violation : ${path} (${theme})`, async ({ page }) => {
      await openPage(page, path, theme);
      await expectNoAxeViolations(page);
    });
  }
}
