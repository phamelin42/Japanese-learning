# Révision par modules — plan d’implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal :** une application mobile d’abord où Phil ouvre un module (vocabulaire ou leçon), s’entraîne
en écrivant les réponses en japonais ou en français, et marque le module terminé, avec une
progression synchronisée entre ses appareils.

**Architecture :** front Angular 22 pré-rendu (contenu des modules dans des fichiers TypeScript du
dépôt, chargés paresseusement), logique de correction et de série dans des fonctions pures et des
services à signaux, progression en `localStorage` synchronisée par une fonction serverless Vercel
adossée à Upstash Redis.

**Tech Stack :** Angular 22 (signaux, zoneless, Signal Forms), `@phamelin/fuda`, `@angular/ssr`
(pré-rendu statique), Vitest via `ng test`, Playwright + `@axe-core/playwright`, Vercel Functions
(Node), `@upstash/redis`.

**Spec :** [`docs/PLAN.md`](../../PLAN.md) et [`docs/adr-001-progression-synchronisee.md`](../../adr-001-progression-synchronisee.md).

## Global Constraints

- Règles de `CLAUDE.md` et `.claude/CLAUDE.commun.md` (Angular 22, signaux, `templateUrl` +
  `styleUrl`, `ViewEncapsulation.None`, BEM `app-*`, tokens Fuda uniquement, `.scss` ≤ 4 Ko).
- Interface en français, typographie française (espace insécable avant `: ; ? !`, apostrophe `’`).
- Texte japonais affiché dans un élément `lang="ja"` ; champs de saisie japonaise avec `lang="ja"`,
  `autocapitalize="off"`, `autocomplete="off"`, `spellcheck="false"`, `enterkeyhint="send"`.
- Téléphone d’abord : 320 px sans défilement horizontal, cibles ≥ 44 px, champ de réponse visible
  au-dessus du clavier virtuel.
- WCAG 2.2 AA : axe sans violation en Jour et en Nuit sur chaque route et chaque état
  (question, verdict juste, verdict faux, fin de série) ; verdict jamais porté par la couleur seule.
- Thème Nuit uniquement par `FdThemeService` (`data-theme="dark"`), jamais `prefers-color-scheme`.
- Aucun accès à `window`, `document`, `localStorage` hors navigateur (pré-rendu).
- Identifiants de module et de question **stables** : ne jamais renommer un `id` publié, la
  progression s’y rattache.
- Quality gates avant chaque PR : `lint`, `typecheck`, `test`, `build`, `format:check`, `e2e` (dès
  la tâche 1), `test:api` (dès la tâche 6), toutes dans `.github/workflows/ci.yml`.
- Une tâche = une PR vers `main` depuis la branche de session, suivie jusqu’à la fusion.

## Review Focus

1. **Particules et voyelles longues en rōmaji** : « watashi wa » doit valider わたしは,
   « getsuyōbi » et « getsuyoubi » doivent valider げつようび, mais « getsuyobi » non (voyelle
   longue manquante = vraie faute). Testé en tâche 3.
2. **Clavier de téléphone** : espaces pleine chasse (`　`), majuscule automatique, point final
   ajouté par le clavier, saisie en katakana demi-chasse : ne doivent pas faire refuser une bonne
   réponse. Testé en tâche 3.
3. **Français sans accents ni article** : « telephone », « le téléphone » et « Téléphone. »
   valident « téléphone ». Testé en tâche 3.
4. **Deux appareils qui écrivent** : terminer un module sur le téléphone puis noter un score sur
   l’ordinateur ne doit perdre ni l’un ni l’autre ; une écriture serveur échouée ne doit jamais
   effacer la copie locale. Testé en tâches 5 et 6.
5. **Contenu mal saisi** : un mot avec des kana invalides, deux `id` identiques, un module sans
   question, une date impossible doivent faire échouer `npm test`, pas l’écran de Phil. Testé en
   tâche 2.

---

### Task 1 : Socle mobile, pré-rendu et e2e

**Files :**

- Modify : `angular.json` (pré-rendu `outputMode: "static"`, `server`), `package.json`,
  `src/app/app.ts|html|scss`, `src/app/app.routes.ts`, `src/app/app.config.ts`, `src/index.html`,
  `.github/workflows/ci.yml`, `CLAUDE.md`, `README.md`
- Create : `src/app/app.routes.server.ts`, `src/main.server.ts`, `src/app/app.config.server.ts`,
  `src/app/pages/home/home.ts|html|scss`, `src/app/pages/not-found/not-found.ts|html|scss`,
  `src/app/pages/settings/settings.ts|html|scss` (thème seulement pour l’instant),
  `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/robots.txt`,
  `vercel.json`, `playwright.config.ts`, `e2e/a11y.spec.ts`, `e2e/icons.spec.ts`,
  `e2e/reflow.spec.ts`, `e2e/routes.ts`

**Interfaces :**

- Produces : `routes: Routes` avec `''` (accueil), `'reglages'`, `'**'` (introuvable), toutes en
  `loadComponent` ; `e2e/routes.ts` exporte `auditedPaths(): string[]` lu par les specs e2e, que
  les tâches suivantes complètent.

- [ ] **Step 1 :** `ng add @angular/ssr` puis `outputMode: "static"` ; vérifier que `npm run build`
      produit `dist/japanese-learning/browser/index.html` et `404.html`.
- [ ] **Step 2 :** coquille dans `app.html` : lien d’évitement, `<header>` (nom du site, lien
      Réglages), `<main id="contenu">` avec `<router-outlet />`. Retirer le `<main>` actuel de la
      page d’accueil, qui devient `HomePage` (titre `<h1>`, état vide Fuda « Aucun module pour
      l’instant » en attendant la tâche 2). Titre et meta description par route.
- [ ] **Step 3 :** `SettingsPage` avec le sélecteur Jour/Nuit de `FdThemeService` et le petit
      script en ligne de `index.html` qui rétablit le thème avant le premier rendu (reprendre celui
      de `site-template`, empreinte sha256 dans la CSP si elle existe).
- [ ] **Step 4 :** icônes d’onglet aux couleurs `sakura` (initiales « 日 » provisoires), déclarées
      dans `index.html`.
- [ ] **Step 5 :** `vercel.json` : `outputDirectory: "dist/japanese-learning/browser"`,
      `installCommand: "npm ci"`, en-têtes `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- [ ] **Step 6 :** Playwright (`webServer` sur `E2E_PORT`, défaut 4310, `reuseExistingServer:
false`, `PW_CHROMIUM` comme exécutable, `--font-render-hinting=none`) ; specs :
      `a11y.spec.ts` (axe, `reducedMotion: 'reduce'`, Jour et Nuit, chaque chemin d’`auditedPaths()`),
      `icons.spec.ts` (les trois icônes répondent 200), `reflow.spec.ts` (à 320 px,
      `scrollWidth <= clientWidth` sur chaque chemin). Ajouter `npm run e2e` à la CI après le build.
- [ ] **Step 7 :** lancer les six quality gates, lire les sorties ; mettre à jour `CLAUDE.md`
      (produit défini dans `docs/PLAN.md`, commandes `e2e`, structure) ; commit
      « Ajoute la coquille mobile, le pré-rendu et les tests e2e », PR.

### Task 2 : Modèle de contenu et premier module

**Files :**

- Create : `src/app/content/module.model.ts`, `src/app/content/modules/index.ts`,
  `src/app/content/modules/jours-de-la-semaine.ts`, `src/app/content/content.spec.ts`,
  `src/app/content/kana.ts`, `src/app/content/kana.spec.ts`
- Modify : `src/app/pages/home/*` (liste des modules)

**Interfaces :**

- Produces (`module.model.ts`) :

```ts
export type ModuleKind = 'vocabulaire' | 'lecon';
export interface VocabularyItem {
  id: string; // stable, kebab-case, unique dans le module
  fr: string; // libellé affiché et réponse française principale
  frAlternatives?: readonly string[];
  kana: string; // hiragana ou katakana, réponse japonaise principale
  kanji?: string; // accepté aussi en réponse, affiché avec les kana dans le sens JP → FR
  note?: string;
}
export interface SheetExample {
  ja: string;
  kana?: string;
  fr: string;
}
export interface SheetSection {
  heading: string;
  paragraphs: readonly string[];
  examples?: readonly SheetExample[];
}
export interface Exercise {
  id: string;
  prompt: string; // consigne + phrase, « ＿＿ » marque le trou
  promptLang: 'fr' | 'ja';
  answers: readonly string[]; // toutes acceptées ; la première est affichée comme corrigé
  answerLang: 'fr' | 'ja';
  explanation?: string; // affichée seulement après l’envoi
}
export interface StudyModule {
  id: string;
  title: string;
  kind: ModuleKind;
  lessonDate: string; // AAAA-MM-JJ
  summary: string;
  sheet?: readonly SheetSection[];
  vocabulary?: readonly VocabularyItem[];
  exercises?: readonly Exercise[];
}
export interface ModuleEntry {
  id: string;
  title: string;
  kind: ModuleKind;
  lessonDate: string;
  summary: string;
  load: () => Promise<StudyModule>;
}
```

- Produces (`modules/index.ts`) : `export const MODULES: readonly ModuleEntry[]`, chaque `load` en
  `import('./<id>').then(m => m.default)`.
- Produces (`kana.ts`) : `isKana(text: string): boolean` (hiragana, katakana, `ー`, `・`, espaces),
  `katakanaToHiragana(text: string): string`.

- [ ] **Step 1 :** tests `kana.spec.ts` : `isKana('げつようび')`, `isKana('コーヒー')` vrais ;
      `isKana('月曜日')`, `isKana('getsu')`, `isKana('')` faux ;
      `katakanaToHiragana('コーヒー') === 'こーひー'`. Les lancer, les voir échouer.
- [ ] **Step 2 :** implémenter `kana.ts` par plages Unicode (U+3041–U+3096, U+30A1–U+30FA, décalage
      0x60) ; tests verts.
- [ ] **Step 3 :** `content.spec.ts`, en boucle sur **tous** les modules chargés : `id` de module
      uniques et en kebab-case, `id` des entrées uniques dans `MODULES` et égaux à `module.id` après
      `load()`, `title`/`kind`/`lessonDate`/`summary` de l’entrée identiques au module, date valide
      (`AAAA-MM-JJ` et date réelle), au moins une question (vocabulaire ou exercices non vides),
      `id` de mots et d’exercices uniques dans le module, `isKana(item.kana)`, `answers` non vide et
      sans doublon, aucun champ vide. Ajouter un cas négatif par règle sur un module factice
      (fonction `validateModule(m: StudyModule): string[]` exportée par la spec ou par
      `content/validate.ts`) pour prouver que chaque règle détecte sa faute.
- [ ] **Step 4 :** module `jours-de-la-semaine` (vocabulaire, `lessonDate` = date du cours donnée
      par Phil) : lundi 月曜日 げつようび, mardi 火曜日 かようび, mercredi 水曜日 すいようび,
      jeudi 木曜日 もくようび, vendredi 金曜日 きんようび, samedi 土曜日 どようび,
      dimanche 日曜日 にちようび, « quel jour (de la semaine) » 何曜日 なんようび ; fiche d’une section
      (曜日 = jour de la semaine, chaque jour porte un élément : lune, feu, eau, bois, or/métal,
      terre, soleil). Tests verts.
- [ ] **Step 5 :** accueil : cartes `FdCard` des modules triés par `lessonDate` décroissante, type
      en badge, filtres Tous / Vocabulaire / Leçons (`FdTabs` ou chips). Les cartes ne deviennent
      des liens qu’en tâche 4, avec la route `module/:id`.
- [ ] **Step 6 :** quality gates, commit « Ajoute le modèle de module et les jours de la semaine »,
      PR.

### Task 3 : Correction des réponses

**Files :**

- Create : `src/app/answers/normalize.ts`, `src/app/answers/romaji.ts`,
  `src/app/answers/check-answer.ts` et leurs `.spec.ts`

**Interfaces :**

- Consumes : `isKana`, `katakanaToHiragana` (tâche 2).
- Produces :
  - `normalizeJapanese(input: string): string` — NFKC (katakana demi-chasse → pleine chasse,
    alphabet pleine chasse → ASCII), suppression de tous les espaces et de la ponctuation finale
    `。.、,!?！？`, minuscules.
  - `normalizeFrench(input: string): string` — minuscules, accents retirés (NFD), apostrophes
    `’'` unifiées, espaces fusionnés, ponctuation finale retirée, article initial retiré
    (`le `, `la `, `les `, `l'`, `un `, `une `, `des `).
  - `romajiPattern(kana: string): RegExp` — construit depuis la réponse en kana une expression
    ancrée qui accepte les graphies Hepburn et Kunrei ; règles ci-dessous.
  - `checkAnswer(input: string, accepted: readonly string[], lang: 'fr' | 'ja'): boolean`.

Règles de `romajiPattern` (la réponse est d’abord passée en hiragana) :

| Kana                                     | Accepté                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| し ち つ ふ じ                           | shi/si, chi/ti, tsu/tu, fu/hu, ji/zi                                                        |
| しゃ ちゃ じゃ (et -u, -o)               | sha/sya, cha/tya, ja/zya/jya                                                                |
| ん                                       | n, nn, n' (n' ou nn obligatoire devant voyelle ou y)                                        |
| っ + consonne                            | consonne doublée (っち → tchi ou cchi)                                                      |
| は を へ **en particule**                | ha/wa, wo/o, he/e — partout, faute de savoir où est la particule                            |
| おう, うう, ああ, いい, えい, ええ, おお | les deux voyelles écrites, ou la voyelle à macron (ō, ū, ā, ī, ē) ; jamais la voyelle seule |
| ー                                       | répète la voyelle précédente, `-`, ou la voyelle à macron                                   |

`checkAnswer` en `ja` : vrai si `normalizeJapanese(input)` égale `normalizeJapanese(a)` pour une
réponse `a`, **ou** égale sa version hiragana quand `a` est en katakana et que l’entrée est en
hiragana (**voir Point à relire 1**), **ou** si l’entrée est en rōmaji et passe
`romajiPattern(a)` pour une réponse en kana. Un kanji accepté figure simplement dans `accepted`.
En `fr` : égalité de `normalizeFrench`.

- [ ] **Step 1 :** tests `romaji.spec.ts` — valident : `getsuyoubi`, `getsuyōbi`, `Getsuyoubi`
      → げつようび ; `watashiwa`, `watashi wa`, `watasiha` → わたしは ; `kitte` → きって ; `konnichiwa`, `konnitiha` → こんにちは ; `kin'en`, `kinnen` valident きんえん,
      `kinen` non ; `kōhī`, `koohii`, `ko-hi-` → コーヒー ; `shashin`, `syasin` → しゃしん.
      Refusent : `getsuyobi` → げつようび, `obasan` → おばあさん, `kite` → きって,
      chaîne vide.
- [ ] **Step 2 :** tests `normalize.spec.ts` et `check-answer.spec.ts` — `げつようび。`,
      `げつ　ようび` (espace pleine chasse), `ｹﾞﾂ` → `ゲツ` après NFKC ; `月曜日` accepté si présent
      dans `accepted` ; français : `telephone`, `Le téléphone.`, `l’ami` / `l'ami` / `ami`,
      ` lundi` valident ; `mardi` ne valide pas `lundi`. Les lancer, les voir échouer.
- [ ] **Step 3 :** implémenter `romaji.ts` (table kana → alternatives, assemblage en expression
      ancrée avec `u`), `normalize.ts`, `check-answer.ts` ; tous les tests verts, puis une mutation
      (retirer la règle des voyelles longues) pour voir un test échouer, et `git checkout --`.
- [ ] **Step 4 :** quality gates, commit « Ajoute la correction des réponses en kana, rōmaji et
      français », PR.

### Task 4 : Série d’entraînement et écrans

**Files :**

- Create : `src/app/practice/question.ts`, `src/app/practice/build-questions.ts`,
  `src/app/practice/practice-session.ts` (service, portée de la page), `src/app/random.ts`,
  `src/app/pages/module/module.ts|html|scss`, `src/app/pages/practice/practice.ts|html|scss`,
  leurs specs, `e2e/practice.spec.ts`
- Modify : `src/app/app.routes.ts`, `src/app/app.routes.server.ts`, `src/app/pages/home/*`,
  `e2e/routes.ts`

**Interfaces :**

- Consumes : `StudyModule`, `MODULES` (tâche 2), `checkAnswer` (tâche 3).
- Produces :
  - `export const RANDOM = new InjectionToken<() => number>('RANDOM', { providedIn: 'root', factory: () => Math.random })`.
  - `interface Question { id: string; prompt: string; promptLang: 'fr' | 'ja'; promptReading?: string; accepted: readonly string[]; answerLang: 'fr' | 'ja'; expected: string; explanation?: string }`
    — `id` = `<itemId>:fr-ja`, `<itemId>:ja-fr` ou `<exerciseId>`.
  - `buildQuestions(module: StudyModule): Question[]` — deux questions par mot (FR → JP accepte
    `kana` et `kanji`, attend `kanji ?? kana` affiché avec les kana ; JP → FR affiche
    `kanji ?? kana` avec `promptReading = kana`, accepte `fr` et `frAlternatives`), une par
    exercice.
  - `PracticeSession` (signaux) : `start(questions: Question[])` mélange par Fisher-Yates avec
    `RANDOM` ; `current: Signal<Question | null>` ; `status: Signal<'asking' | 'right' | 'wrong' | 'done'>` ;
    `submit(input: string)` (sans effet si `status !== 'asking'` ou entrée vide) ;
    `next()` ; une question ratée est remise en fin de file ; `firstTryScore: Signal<{ right: number; total: number }>` ;
    `remaining: Signal<number>`.
  - Routes `module/:id` (`ModulePage`) et `module/:id/entrainement` (`PracticePage`), pré-rendues
    par `getPrerenderParams` (`app.routes.server.ts`) depuis `MODULES` ; `id` inconnu → page
    introuvable ; `e2e/routes.ts` ajoute les deux chemins de chaque module.

- [ ] **Step 1 :** tests `build-questions.spec.ts` (module « jours » : 16 questions, `id` uniques,
      lundi FR → JP accepte `げつようび` et `月曜日`) et `practice-session.spec.ts` avec `RANDOM`
      fixe : ordre déterministe ; `submit` faux → `wrong`, la question revient après les autres et
      ne compte pas au score au premier essai ; deuxième `submit` sans `next()` ignoré ; tout juste
      → `done` et score 16/16 ; entrée vide ignorée. Les voir échouer.
- [ ] **Step 2 :** implémenter ; tests verts.
- [ ] **Step 3 :** `ModulePage` : titre `<h1>`, date du cours en `<time>`, fiche (sections en
      `<section>`, exemples japonais `lang="ja"`), nombre de questions, bouton principal
      « S’entraîner ». Texte toujours interpolé, jamais `innerHTML`.
- [ ] **Step 4 :** `PracticePage` : avancement (`FdProgress`, « 3 / 16 »), consigne (« Écris en
      japonais » / « Écris en français »), invite (`lang` selon `promptLang`, lecture en kana en
      dessous), formulaire Signal Forms avec `FdTextField` (libellé visible, attributs des Global
      Constraints selon `answerLang`), bouton « Valider ». Après l’envoi, dans un `@if` : verdict
      icône + texte (« Juste ! » / « Pas tout à fait »), bonne réponse, explication, annonce
      `aria-live`, focus sur « Suivant » (bouton secondaire) ; puis focus dans le champ. Écran de
      fin : score au premier essai, « Recommencer », lien retour au module. Rien de la réponse dans
      le DOM avant l’envoi.
- [ ] **Step 5 :** `e2e/practice.spec.ts` : série complète du module « jours » au clavier (réponses
      lues depuis le module, une faute volontaire qui revient en fin de série), focus après envoi
      sur « Suivant » ; `auditedPaths()` et l’audit axe couvrent question, verdict juste, verdict
      faux et fin de série, Jour et Nuit ; reflow à 320 px.
- [ ] **Step 6 :** quality gates, commit « Ajoute l’entraînement par module », PR.

### Task 5 : Progression sur l’appareil

**Files :**

- Create : `src/app/progress/progress.model.ts`, `src/app/progress/merge-progress.ts`,
  `src/app/progress/progress-store.ts` et leurs specs
- Modify : `src/app/pages/home/*`, `src/app/pages/module/*`, `src/app/pages/practice/*`,
  `e2e/practice.spec.ts`

**Interfaces :**

- Produces (`progress.model.ts`, sans dépendance Angular, réutilisé par `api/` en tâche 6) :

```ts
export interface ModuleProgress {
  done: boolean;
  doneAt: string | null; // ISO
  sessions: number;
  bestFirstTry: { right: number; total: number } | null;
  lastPracticedAt: string | null;
  updatedAt: string; // ISO, sert à la fusion
}
export interface ProgressDocument {
  version: 1;
  modules: Record<string, ModuleProgress>;
}
export function parseProgress(raw: unknown): ProgressDocument | null; // borne : 64 Ko sérialisés, 500 modules
```

- Produces : `mergeProgress(a: ProgressDocument, b: ProgressDocument): ProgressDocument` (par
  module, `updatedAt` le plus récent l’emporte ; égalité → `a`) ; `CLOCK` (jeton
  `() => Date`) ; `ProgressStore` (`@Service()`) : `progress: Signal<ProgressDocument>`,
  `moduleProgress(id): Signal<ModuleProgress | null>`, `setDone(id, done: boolean)`,
  `recordSession(id, score: { right: number; total: number })`, `replace(doc)` ; lecture et
  écriture de `localStorage['jl.progress']` seulement dans le navigateur (`afterNextRender`
  / `isPlatformBrowser`), lecture invalide → document vide sans exception.

- [ ] **Step 1 :** tests `merge-progress.spec.ts` (module terminé sur A + score plus récent sur B
      pour un autre module → les deux gardés ; même module, `updatedAt` plus récent gagne ;
      commutatif sauf égalité) et `progress.model.spec.ts` (`parseProgress` refuse `null`, chaîne,
      version 2, score négatif, `right > total`, date invalide, plus de 64 Ko ; accepte un document
      valide). Les voir échouer, implémenter, verts.
- [ ] **Step 2 :** tests `progress-store.spec.ts` avec `CLOCK` fixe : `setDone` puis relecture par
      un nouveau `ProgressStore` (même `localStorage`) ; `recordSession` incrémente `sessions` et ne
      remplace `bestFirstTry` que par un meilleur taux ; `localStorage` corrompu → vide. Implémenter,
      verts.
- [ ] **Step 3 :** interface : badge « Terminé » et filtre À faire / Terminés sur l’accueil ;
      interrupteur `FdSwitch` « Module terminé » sur la page module (pas de confirmation : l’action
      se défait en un geste) ; fin de série : `recordSession` puis bouton « Marquer comme
      terminé » si le module ne l’est pas. e2e : marquer terminé, recharger, badge présent.
- [ ] **Step 4 :** quality gates, commit « Garde la progression sur l’appareil », PR.

### Task 6 : Synchronisation de la progression

**Files :**

- Create : `api/progress.ts`, `api/progress.test.ts`, `tsconfig.api.json`,
  `src/app/progress/progress-sync.ts` et sa spec
- Modify : `package.json` (`@upstash/redis`, scripts `test:api`, `typecheck`),
  `.github/workflows/ci.yml`, `vercel.json`, `src/app/pages/settings/*`, `src/app/app.config.ts`
  (`provideHttpClient(withFetch())`), `README.md`

**Interfaces :**

- Consumes : `ProgressDocument`, `parseProgress`, `mergeProgress` (tâche 5), importés par chemin
  relatif depuis `src/app/progress/` (aucune dépendance Angular dans ces deux fichiers).
- Produces :
  - `api/progress.ts` : `export default { fetch(request: Request): Promise<Response> }` (Vercel
    Functions, runtime Node). `GET` → 200 + document (ou `{ version: 1, modules: {} }`) ;
    `PUT` → lit au plus 64 Ko, `parseProgress`, fusionne avec l’existant **côté serveur aussi**,
    écrit, renvoie 200 + document fusionné ; autre méthode → 405 ; secret absent ou faux → 401
    (comparaison `timingSafeEqual` sur des empreintes SHA-256 de même longueur) ; corps invalide
    ou trop grand → 400 ; variables manquantes ou Redis en erreur → 503, `Cache-Control: no-store`,
    `Retry-After: 60`. Toutes les réponses en `no-store`. Variables : `PROGRESS_SECRET`,
    `KV_REST_API_URL` et `KV_REST_API_TOKEN` (noms posés par l’intégration Upstash du
    Marketplace ; repli sur `UPSTASH_REDIS_REST_URL`/`_TOKEN`). Le handler reçoit son client Redis
    par une fabrique remplaçable pour les tests.
  - `ProgressSync` (`@Service()`) : `secret: Signal<string | null>` (`localStorage['jl.sync-secret']`),
    `state: Signal<'off' | 'syncing' | 'ok' | 'error' | 'unauthorized'>`,
    `lastSyncAt: Signal<string | null>`, `setSecret(s: string | null)`, `syncNow(): Promise<void>` ;
    au démarrage dans le navigateur et après chaque modification du `ProgressStore` (regroupées
    sur 2 s) : `GET`, `mergeProgress(local, distant)`, `ProgressStore.replace`, `PUT` du résultat.
    Un échec laisse la copie locale intacte et passe `state` à `error`.

- [ ] **Step 1 :** `api/progress.test.ts` (`node --test`, types retirés nativement par Node 24,
      faux Redis en mémoire) : 401 sans en-tête et avec un code faux ; 200 au `GET` vide ; `PUT`
      valide puis `GET` renvoie le document ; `PUT` de 70 Ko → 400 et rien d’écrit ; `PUT` d’un
      document plus ancien pour un module ne remplace pas la version serveur plus récente ; Redis
      qui lève → 503 avec `Retry-After` ; `DELETE` → 405. Les voir échouer.
- [ ] **Step 2 :** implémenter `api/progress.ts` ; `tsconfig.api.json` (types Node, `lib` ES2024,
      inclut `api/**/*.ts` et les deux fichiers partagés) ajouté à `typecheck` ; script
      `test:api` et étape CI. Tests verts.
- [ ] **Step 3 :** tests `progress-sync.spec.ts` (`HttpTestingController`) : sans secret, aucune
      requête et `state === 'off'` ; avec secret, `GET` puis `PUT` du document fusionné et en-tête
      `Authorization: Bearer …` ; 401 → `unauthorized`, copie locale inchangée ; 503 ou erreur
      réseau → `error`, copie locale inchangée. Implémenter, verts.
- [ ] **Step 4 :** Réglages : champ « Code de synchronisation » (type `password`, libellé visible),
      boutons « Enregistrer » et « Oublier ce code sur cet appareil » (confirmation `FdDialog`),
      état de la synchro en texte (« Synchronisé à 14 h 32 », « Code refusé », « Hors ligne,
      nouvel essai au prochain chargement »). e2e : `/api/progress` simulée par `page.route`
      (aucun appel réseau réel), cas réussi et cas 401 ; axe sur les deux états.
- [ ] **Step 5 :** vérifier en local `vercel.json` (fonctions dans `api/`, sortie du pré-rendu)
      avec `npx vercel build` si disponible sans compte, sinon le dire dans la PR. Quality gates,
      commit « Synchronise la progression entre appareils », PR qui liste les actions de Phil
      (base Upstash, `PROGRESS_SECRET`).

### Task 7 : Intégrer les notes de cours

**Files :**

- Create : `.claude/skills/integrer-cours/SKILL.md`, `docs/ajouter-un-cours.md`
- Modify : `CLAUDE.md` (section « Après un cours »)

**Interfaces :**

- Consumes : `StudyModule`, `MODULES`, `validateModule` (tâche 2), `buildQuestions` (tâche 4).

- [ ] **Step 1 :** `docs/ajouter-un-cours.md` : ce que Phil colle (notes brutes, photo de cahier ou
      liste, avec la date du cours), et ce que l’agent en fait : un module de vocabulaire par thème
      nouveau ou ajout de mots à un module existant (nouveaux `id`, jamais de renommage), un module
      « leçon » par point faible avec fiche et 6 à 12 exercices ; corrections du japonais signalées
      à Phil dans la PR plutôt que corrigées en silence ; kana obligatoires, kanji seulement s’ils
      sont dans les notes ou d’usage courant pour le niveau.
- [ ] **Step 2 :** skill `integrer-cours` (déclencheur : « voici mes notes du cours », « ajoute ce
      vocabulaire ») qui suit ce document : lire `MODULES`, proposer en une fois le découpage en
      modules et les doutes (lecture, sens, niveau de politesse) avec une valeur par défaut, écrire
      les fichiers, `npm test` (contrôle du contenu), e2e de la série, PR, fusion après CI verte.
- [ ] **Step 3 :** essai à blanc avec de fausses notes (trois mots et une particule) dans une
      branche jetable : le skill produit des modules qui passent `npm test` ; ne pas pousser
      l’essai. Quality gates, commit « Ajoute le skill d’intégration des notes de cours », PR.

---

## Points à relire en priorité

1. **Katakana tapé en hiragana** : la règle proposée accepte こーひー pour コーヒー quand Phil
   tape en kana. Plus tolérant, mais n’entraîne pas l’écriture des katakana. Alternative : refuser,
   et n’accepter le rōmaji que pour les katakana.
2. **Particules en rōmaji** : は/を/へ acceptent ha/wa, wo/o, he/e partout dans le mot, donc
   « washi » validerait はし (baguettes). Rare ; le contraire refuserait « watashi wa ».
3. **Pas de bibliothèque de rōmaji** (`wanakana`) : table écrite à la main et testée, pour éviter
   une dépendance d’exécution ; à revoir si les cas limites s’accumulent.
4. **Site indexé et pré-rendu** comme le veut le contexte commun ; s’il doit rester discret,
   ajouter `noindex` et le retirer du sitemap.
