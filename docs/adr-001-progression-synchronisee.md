# ADR-001 — Progression synchronisée par Vercel et Upstash Redis

- **Statut** : accepté (Phil, 30/10/2026)
- **Contexte** : le site était un front statique sans serveur.

## Contexte

Phil révise sur son téléphone et sur son ordinateur et veut retrouver la même progression (modules
terminés, scores) sur les deux. Le contenu des modules, lui, est public et vit dans le dépôt. Un
seul utilisateur.

## Décision

- Deux méthodes sur une fonction serverless Vercel, `api/progress.ts`, dans ce dépôt :
  `GET /api/progress` (lit) et `PUT /api/progress` (écrit le document entier, fusionné côté client).
- Stockage : une clé `progress:v1` dans une base **Upstash Redis** créée depuis le Marketplace
  Vercel (offre gratuite), client `@upstash/redis` (dépendance d’exécution du serveur seulement,
  absente du bundle du navigateur).
- Accès : en-tête `Authorization: Bearer <code>` comparé en temps constant à la variable
  d’environnement `PROGRESS_SECRET`. Le code est saisi une fois par appareil dans « Réglages » et
  gardé dans `localStorage`.
- Le navigateur garde toujours une copie locale (`localStorage`) : l’application marche sans code,
  sans réseau ou si le serveur répond 503 ; la synchro reprend au prochain chargement.
- Fusion : par module, l’entrée la plus récente (`updatedAt`) l’emporte ; la fonction de fusion est
  pure et partagée entre client et serveur.

## Garde-fous

- Corps limité à 64 Ko et validé (schéma) avant écriture : invalide → 400, rien n’est écrit.
- Variables absentes ou Redis injoignable → 503 `no-store` avec `Retry-After`, jamais de faux
  contenu.
- Code faux → 401, sans indiquer s’il est presque bon.
- Aucune donnée personnelle : identifiants de modules, dates et scores uniquement.

## Options écartées

- **Progression sur l’appareil seulement** : pas de serveur, mais ne répond pas au besoin.
- **Supabase** : un SDK tiers dans le navigateur et un service de plus à administrer pour un seul
  document JSON.
- **Fichier JSON dans un dépôt GitHub** : lent, jeton à protéger, conflits d’écriture.
- **Connexion OAuth** : surdimensionnée pour un seul utilisateur.

## Conséquences

- Phil crée la base Upstash depuis Vercel et la variable `PROGRESS_SECRET` (les variables
  d’environnement ne sont pas gérées par `infra`).
- La CI type-vérifie et teste aussi `api/` (`tsconfig.api.json`, `npm run test:api`).
