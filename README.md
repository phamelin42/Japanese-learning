# Japanese-learning

Web app so I can work on my weak points in Japanese.

Angular 22 et le design system [Fuda](https://github.com/phamelin42/design-system-fuda) (`@phamelin/fuda`). Node ≥ 22.22.3 (`.nvmrc` : 24).

```sh
npm ci
npm start      # serveur de développement
npm test       # tests unitaires
npm run test:api  # tests de la fonction serveur api/
npm run build  # pré-rendu de production
npm run e2e    # Playwright + axe sur le build
```

## Synchronisation de la progression

La progression (modules terminés, scores) est synchronisée par `api/progress.ts` (fonction Vercel) et une base Upstash Redis : voir `docs/adr-001-progression-synchronisee.md`. Variables d'environnement du projet Vercel : `PROGRESS_SECRET` (le code saisi dans Réglages), `KV_REST_API_URL` et `KV_REST_API_TOKEN` (posées par l'intégration Upstash). Sans elles, l'application marche, la progression reste sur l'appareil.

## Installer l'application sur le téléphone

L'application est installable (PWA) : elle s'ouvre en plein écran, avec son icône sur l'écran d'accueil.

- **Android (Chrome)** : menu ⋮ → « Installer l'application » (ou « Ajouter à l'écran d'accueil »).
- **iPhone (Safari)** : bouton Partager → « Sur l'écran d'accueil ».

Elle n'est pas encore utilisable hors connexion (pas de service worker) : il faut du réseau pour l'ouvrir.
