# Japanese learning

Règles communes à tous les projets de Phil (copie de `phamelin42/claude-context`, ne pas la modifier ici ; ce fichier l'emporte en cas de désaccord) : @.claude/CLAUDE.commun.md

## Le projet

Application web pour que Phil travaille ses points faibles en japonais. Domaine : `japanese-learning.phamelin.fr`.

Révision par **modules** (vocabulaire ou leçon), mobile d'abord : Phil colle ses notes de cours, l'agent les transforme en modules (contenu dans le dépôt, relu en PR), Phil s'entraîne en écrivant les réponses et marque lui-même un module terminé. Produit et décisions validées : `docs/PLAN.md` ; progression synchronisée par Vercel + Upstash Redis : `docs/adr-001-progression-synchronisee.md` ; tâches : `docs/superpowers/plans/2026-10-30-revision-par-modules.md`, à suivre dans l'ordre, une PR par tâche. Plan validé par Phil le 30/10/2026.

- Saisie japonaise en kana **ou** rōmaji (kanji accepté s'il est dans la fiche) ; questions dans les deux sens, mélangées.
- Les `id` de modules, de mots et d'exercices ne se renomment jamais : la progression s'y rattache.

## Après un cours

Phil colle ses notes : suivre le skill `integrer-cours` (`.claude/skills/integrer-cours/SKILL.md`), qui applique `docs/ajouter-un-cours.md`. Date du cours obligatoire, doutes posés en une fois, aucun `id` renommé.

## Commandes

| Commande                             | Rôle                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `npm start`                          | Serveur de développement                                                                                      |
| `npm test`                           | Tests unitaires (Vitest via `ng test`)                                                                        |
| `npm run test:api`                   | Tests de la fonction serveur `api/` (Vitest seul, Node : pas d'Angular)                                       |
| `npm run lint` / `npm run typecheck` | ESLint (angular-eslint) / tsc sur l'appli et les specs                                                        |
| `npm run build`                      | Pré-rendu statique (`dist/japanese-learning/browser`), puis `tools/postbuild.mjs` (`404.html`, `sitemap.xml`) |
| `npm run e2e`                        | Playwright sur le build : axe Jour/Nuit, reflow 320 px, clavier, 404, sitemap                                 |
| `npm run format` / `format:check`    | Prettier                                                                                                      |

`e2e` en session cloud : `PW_CHROMIUM=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome npm run e2e` (serveur sur `E2E_PORT`, 4310 par défaut, jamais réutilisé). Pas encore de mesure d'audience : le site doit d'abord être enregistré dans Umami.

## Structure

- `src/app/` : coquille (`app.*`), `pages/<page>/` (une route paresseuse chacune), `seo/` (titre, description, canonique et `noindex` lus dans les `data` des routes).
- `src/app/content/` : modèle de module, index `modules/index.ts` (un fichier par module), `validate.ts` lancé sur tous les modules par `content.spec.ts`. `answers/` : correction (kana, rōmaji, français). `practice/` : questions et série. `progress/` : progression locale et synchro.
- `api/progress.ts` : fonction Vercel (GET/PUT) ; sa logique est dans `api/_lib/` (un fichier de `api/` sans `_` devient une fonction). Elle importe `progress.model.ts` et `merge-progress.ts`, qui restent sans dépendance Angular. Variables Vercel : `PROGRESS_SECRET`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` (ADR-001).
- `public/manifest.webmanifest` + `icon-*.png` : installation sur l'écran d'accueil (PWA). `theme_color` du manifeste et `<meta name="theme-color">` de `index.html` vont ensemble (`e2e/pwa.spec.ts` le vérifie, ainsi que la taille réelle de chaque icône). Pas de service worker : hors ligne non géré.
- `e2e/` : `routes.ts` liste les chemins audités par axe et le reflow ; toute nouvelle page ou tout nouvel état s'y ajoute.
- Pré-rendu : chaque route est déclarée dans `app.routes.server.ts` ; une route sans pré-rendu n'a ni HTML lisible sans JavaScript ni place au sitemap.
- `src/styles.scss` : polices de Fuda, **avec** les sous-ensembles japonais (le site affiche du japonais). Les styles de Fuda sont déclarés dans `angular.json`.

## Pièges

- **e2e et pré-rendu** : le `<h1>` est dans le HTML avant qu'Angular ne s'hydrate. `openPage` (`e2e/helpers.ts`) attend `html[data-app-ready]`, posé quand l'application est stable (page paresseuse chargée et hydratée, pas au premier rendu de la coquille) ; une interaction sans cette attente se perd en CI (plus lente). Après une action, attendre son effet (attribut, `localStorage`, disparition de « Suivant ») avant de recharger ou de lire l'écran suivant.
- Les échappements `\uXXXX` écrits par l'outil d'édition deviennent des caractères littéraux : construire les plages Unicode avec `String.fromCodePoint` (voir `content/kana.ts`).

## Écarts au contexte commun

- Polices : latin **et** japonais (Dela Gothic One 400, Zen Maru Gothic 500 et 700), contrairement aux sites qui n'affichent pas de japonais.
