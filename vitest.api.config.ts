import { defineConfig } from 'vitest/config';

// Tests de la fonction serveur (api/) : Node, sans Angular ni TestBed (voir `npm test` pour l'appli).
export default defineConfig({
  test: {
    include: ['api/**/*.test.ts'],
    environment: 'node',
  },
});
