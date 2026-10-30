---
name: integrer-cours
description: Intégrer les notes d’un cours de japonais de Phil dans l’application (dépôt japanese-learning) — vocabulaire et points faibles transformés en modules (fiche, mots, exercices), contrôlés, livrés par une PR suivie jusqu’à sa fusion. À utiliser dès que Phil colle des notes de cours, du vocabulaire, une liste de mots ou ses points faibles (« voici mes notes du cours », « ajoute ce vocabulaire », « j’ai vu les compteurs aujourd’hui »).
---

# Intégrer un cours

Le document qui fait foi est `docs/ajouter-un-cours.md` : le lire **en entier** avant de
commencer. Ce skill n’en est que l’ordre d’exécution.

1. **Date du cours** : la demander si les notes ne la donnent pas. Ne jamais l’inventer.
2. **Lire l’existant** : `src/app/content/modules/index.ts`, puis seulement les modules du même
   thème (`grep -rn "<mot>" src/app/content/modules`). Format : `src/app/content/module.model.ts`.
3. **Proposer en une seule fois** (`AskUserQuestion` ou un message court) : le découpage en
   modules (créés ou enrichis, vocabulaire ou leçon) et chaque doute avec sa valeur par défaut
   (lecture, sens, politesse, kanji, faute probable dans les notes). Avancer sur le reste pendant
   l’attente ; appliquer les valeurs par défaut si Phil dit « vas-y ».
4. **Écrire** `src/app/content/modules/<id>.ts` (export par défaut d’un `StudyModule`) et son
   entrée dans `modules/index.ts`, décrite à l’identique. Nouveaux `id` en kebab-case ; aucun `id`
   publié n’est renommé ni supprimé.
5. **Contrôler** : `npx ng test --no-watch --include='src/app/content/**'` pendant l’écriture, puis
   toutes les étapes de `.github/workflows/ci.yml` (`lint`, `typecheck`, `test`, `test:api`,
   `build`, `format:check`, `e2e` avec `PW_CHROMIUM=…`).
6. **Livrer** : commit « Ajoute le cours du JJ/MM : <thèmes> », PR vers `main` (modules, nombre de
   questions, doutes tranchés, fautes signalées), abonnement à la PR, fusion après CI verte, puis
   vérification de la CI de `main` et du déploiement.
7. **Rendre compte** à Phil : modules ajoutés, lien de la PR et son état, ce qu’il doit vérifier
   (lectures douteuses), en liste numérotée.
