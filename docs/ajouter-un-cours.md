# Ajouter un cours

Après chaque cours, Phil colle ses notes dans une session Claude (« voici mes notes du cours »).
L’agent les transforme en modules, ouvre une PR et la fusionne une fois la CI verte ; Vercel
publie à la fusion. Le skill `.claude/skills/integrer-cours` suit ce document.

## Ce que Phil donne

- La **date du cours** (sinon la demander : elle date le module et trie l’accueil).
- Ses notes, telles quelles : liste de mots, phrases, remarques du professeur, photo du cahier.
- Ses points faibles du jour, s’il les a notés (« je confonds は et が », « les compteurs »).

## Ce que l’agent en fait

1. **Lire l’existant** : `src/app/content/modules/index.ts` et les modules du même thème. Un mot
   déjà présent ne se duplique pas ; un thème déjà ouvert s’enrichit (nouveaux mots à la fin, avec
   de **nouveaux `id`**).
2. **Proposer le découpage en une fois**, avant d’écrire : quels modules (créés ou enrichis),
   lesquels sont du vocabulaire, lesquels des leçons, et la liste des doutes, chacun avec une
   valeur par défaut :
   - lecture incertaine (日 : にち ou ひ ?), sens ambigu, niveau de politesse (です/ます ou forme
     neutre) ;
   - kanji : seulement s’il est dans les notes ou d’usage courant pour le niveau ; sinon kana seuls ;
   - faute probable dans les notes : la signaler, ne jamais la corriger en silence.
3. **Écrire les modules** :
   - **vocabulaire** (`kind: 'vocabulaire'`) : un mot par entrée, `fr` comme Phil l’écrirait,
     `frAlternatives` pour les synonymes courants, `kana` obligatoire (hiragana, ou katakana pour les
     mots d’emprunt), `kanji` facultatif, `note` pour un moyen mnémotechnique (affichée **après**
     la réponse seulement) ;
   - **leçon** (`kind: 'lecon'`) pour un point faible : une fiche courte (règle, deux à quatre
     exemples avec kana et traduction) et **6 à 12 exercices** (phrase à trou « ＿＿ » ou à
     traduire), chacun avec toutes les réponses acceptables et une explication ;
   - `id` en kebab-case, **jamais renommés** une fois publiés (la progression s’y rattache) ;
   - le fichier `modules/<id>.ts` et son entrée dans `modules/index.ts`, décrits à l’identique.
4. **Vérifier** : `npm test` (le contrôle du contenu refuse kana invalides, doublons, dates
   impossibles, modules sans question), puis toutes les quality gates de la CI, `e2e` compris
   (chaque module est audité par axe et le reflow).
5. **PR** : la liste des modules créés ou enrichis, le nombre de questions, les doutes tranchés par
   défaut et les fautes signalées dans les notes. Suivre la PR jusqu’à la fusion.

## Exemple

Notes : « 30/10 — couleurs : rouge あか 赤, bleu あお 青, blanc しろ 白. Je confonds い-adjectifs
et な-adjectifs. »

- Module `couleurs` (vocabulaire) : `rouge`, `bleu`, `blanc`, avec leurs kana et kanji.
- Module `adjectifs-i-na` (leçon) : fiche « い-adjectifs et な-adjectifs » et exercices du type
  « この はな は ＿＿ です。(beau, きれい) » → `きれい`.
