import { defineConfig } from '@playwright/test';

// Port réglable et jamais réutilisé : la machine peut héberger le serveur d'un autre projet.
const port = Number(process.env['E2E_PORT'] ?? 4310);

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    viewport: { width: 390, height: 844 },
    launchOptions: {
      // Chromium déjà installé : PW_CHROMIUM=/chemin/vers/chrome (sessions cloud).
      executablePath: process.env['PW_CHROMIUM'] || undefined,
      args: ['--font-render-hinting=none'],
    },
  },
  // Les tests tournent sur le build de production : `npm run build` d'abord.
  webServer: {
    command: `npx http-server dist/japanese-learning/browser -p ${port} -s --ext html`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
  },
});
