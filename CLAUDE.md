# Japanese learning

Règles communes à tous les projets de Phil (copie de `phamelin42/claude-context`, ne pas la modifier ici ; ce fichier l'emporte en cas de désaccord) : @.claude/CLAUDE.commun.md

## Le projet

Application web pour que Phil travaille ses points faibles en japonais. Domaine : `japanese-learning.phamelin.fr`.

**Le produit n'est pas encore défini** (contenu, types d'exercices, suivi des progrès, stockage) : le dépôt n'est qu'un squelette Angular avec Fuda. Aucune fonctionnalité ne se code avant que Phil ait validé un plan par étapes (modèle : `lois-votes/docs/PLAN.md`).

## Commandes

| Commande                             | Rôle                                                   |
| ------------------------------------ | ------------------------------------------------------ |
| `npm start`                          | Serveur de développement                               |
| `npm test`                           | Tests unitaires (Vitest via `ng test`)                 |
| `npm run lint` / `npm run typecheck` | ESLint (angular-eslint) / tsc sur l'appli et les specs |
| `npm run build`                      | Build de production (`dist/japanese-learning/browser`) |
| `npm run format` / `format:check`    | Prettier                                               |

Pas encore d'e2e (Playwright, axe) ni de mesure d'audience : à ajouter avec la première page réelle.

## Structure

- `src/app/` : l'application (pour l'instant la seule page d'accueil).
- `src/styles.scss` : polices de Fuda, **avec** les sous-ensembles japonais (le site affiche du japonais). Les styles de Fuda sont déclarés dans `angular.json`.

## Écarts au contexte commun

- Polices : latin **et** japonais (Dela Gothic One 400, Zen Maru Gothic 500 et 700), contrairement aux sites qui n'affichent pas de japonais.
