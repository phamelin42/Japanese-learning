# Plan produit — Japanese learning

Application web, pensée d’abord pour le téléphone, pour réviser ce que Phil apprend en cours
particulier de japonais. Domaine : `japanese-learning.phamelin.fr`.

## Le principe

1. À chaque cours, Phil note le **nouveau vocabulaire** et ses **points faibles**.
2. En fin de cours, il colle ses notes dans une session Claude ; l’agent les transforme en
   **modules** (fichiers de contenu dans le dépôt), vérifie le japonais, et ouvre une PR. Le
   déploiement Vercel publie les nouveaux modules à la fusion.
3. Dans l’application, Phil choisit un module (ex. « Jours de la semaine »), lit sa fiche s’il y en
   a une, puis s’entraîne en **écrivant** les réponses, jusqu’à tout réussir.
4. Quand il estime avoir assez révisé, il **marque le module comme terminé** lui-même. Il peut le
   rouvrir à tout moment.

## Décisions validées (Phil, 30/10/2026)

| Sujet                   | Décision                                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Saisie en japonais      | Kana (clavier japonais du téléphone) **ou** rōmaji ; le kanji est accepté aussi quand la fiche en donne un.                                                                |
| Sens des exercices      | Les deux sens, mélangés : FR → JP (on écrit le japonais) et JP → FR (on écrit le français).                                                                                |
| Progression             | **Synchronisée** entre téléphone et ordinateur.                                                                                                                            |
| Stockage de la synchro  | Fonctions serverless Vercel (`/api/progress`) dans ce dépôt + base clé-valeur **Upstash Redis** (Marketplace Vercel). Voir [ADR-001](adr-001-progression-synchronisee.md). |
| Accès à la progression  | **Code secret** saisi une fois par appareil, comparé côté serveur à une variable d’environnement. Le contenu des leçons reste public.                                      |
| Module « point faible » | **Fiche de leçon** (règle, exemples) + **exercices** à saisie libre.                                                                                                       |
| Contenu                 | Rédigé par l’agent à partir des notes de Phil, dans le dépôt, relu dans une PR. Pas d’éditeur dans l’application.                                                          |
| Fin d’un module         | Marquée **à la main** par Phil ; pas de répétition espacée automatique.                                                                                                    |

## Ce qu’est un module

Un module a un identifiant stable (la progression s’y rattache), un titre, la date du cours, un type
(**vocabulaire** ou **leçon**) et trois parties facultatives, dont au moins une produit des
questions :

- **fiche** : sections de texte (titre, paragraphes, exemples japonais/français) ;
- **vocabulaire** : mots (français, kana, kanji éventuel, variantes françaises acceptées) ; chaque
  mot donne une question dans chaque sens ;
- **exercices** : phrases à compléter ou à traduire, avec les réponses acceptées.

## Les écrans (téléphone d’abord, 320 px sans défilement horizontal)

- **Accueil** : liste des modules, du cours le plus récent au plus ancien, filtrable (tous /
  vocabulaire / leçons, à faire / terminés), avec un badge « Terminé ».
- **Module** : fiche (si elle existe), nombre de questions, bouton « S’entraîner », case « Module
  terminé ».
- **Entraînement** : une question à la fois, champ de saisie en bas d’écran (au-dessus du clavier),
  verdict en texte et icône (jamais la couleur seule), bonne réponse affichée après l’envoi,
  « Suivant » en bouton secondaire. Une question ratée revient en fin de série jusqu’à être
  réussie.
- **Fin de série** : score au premier essai, « Recommencer », « Marquer comme terminé ».
- **Réglages** : thème Jour/Nuit, code de synchronisation, état de la dernière synchro.

## Étapes

Chaque étape est une PR fusionnée avant la suivante ; le détail est dans
[le plan d’implémentation](superpowers/plans/2026-10-30-revision-par-modules.md).

1. **Socle** : coquille mobile, routes paresseuses, pré-rendu, icônes, Playwright + axe.
2. **Contenu** : modèle de module, contrôle automatique du contenu, premier module « Jours de la
   semaine ».
3. **Correction** : comparaison des réponses (kana, rōmaji, kanji, français).
4. **Entraînement** : série de questions, écrans module, entraînement et fin de série.
5. **Progression locale** : modules terminés, scores, sur l’appareil.
6. **Synchronisation** : `/api/progress`, code secret, fusion des progressions.
7. **Intégration des cours** : skill `integrer-cours` pour transformer les notes de Phil en modules.

## Hors périmètre (pour l’instant)

Répétition espacée, audio et prononciation, reconnaissance d’écriture manuscrite, éditeur de contenu
dans l’application, comptes multiples, mode hors ligne complet (service worker).
