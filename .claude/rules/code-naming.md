# Nommage dans le code — le repo décide, pas le ticket

Un ticket décrit un **comportement**, pas des noms de fonctions ni de variables. Les noms des fonctions, variables et types qu'on écrit suivent les **conventions du repo**, quelle que soit la façon dont le ticket, la spec ou le grooming formulent les choses.

Cette rule porte sur les noms écrits **dans le code** : fonctions, variables, types. Le nommage des **fichiers** (PascalCase pour un composant, camelCase ailleurs) est dans `files.md`.

## La règle

- Le ticket dit *ce que le code doit faire*, il ne dicte pas *comment nommer* ce qui le fait. Si un ticket écrit `formulaireIncomplet(champs)`, ce n'est pas un ordre de nommage, c'est une description de comportement. On nomme selon nos conventions.
- **Booléens** : forme interrogative, en anglais, préfixe `is` / `has` / `should` (`isFormValid`, `hasUnsavedChanges`). Jamais une tournure verbale française (`formulaireIncomplet`, `utilisateurExistePour`).
- **Le reste du code est en anglais** aussi, le repo l'est déjà (`composeGreeting`, `normalizeEmail`, `isSendDisabled`, `errorTargetFor`). Un ticket rédigé en français ne fait pas écrire des noms en français.

## La seule exception : le vocabulaire du contrat

Un nom qui vient du **contrat d'API** (`src/types/apiContract.ts`), d'une **API externe** ou d'une **librairie** se reprend **tel quel**. Ce n'est pas notre invention, c'est du vocabulaire partagé que personne ne renomme unilatéralement : le front et le back doivent s'accorder dessus.

- ✓ Reprendre les noms de types et de champs déclarés dans le contrat, les codes d'erreur qu'il définit, et les options des librairies (`credentials: 'include'`, `dangerouslySetInnerHTML`).
- ✗ Reprendre un nom de fonction ou de variable que le ticket a inventé côté front (`formulaireIncomplet`, `utilisateurExistePour`). Ceux-là ne sont pas dans le contrat, donc nos conventions priment.

Le test : **ce nom est-il dans `apiContract.ts` (ou l'API / la lib) ?** Si oui, on le reprend à l'identique. Si non, c'est à nous de le nommer selon nos conventions, même quand le ticket propose un nom.

## Corollaire quand on rédige un ticket

Ne pas écrire de noms de fonctions ou de variables inventés dans un ticket, décrire le comportement à la place. Mettre un nom de fonction dans un ticket force le LLM (et le dev) à l'employer sans raison, et fige une mauvaise décision de nommage à la source. Les seuls noms admis dans un ticket sont ceux du contrat, de l'API ou des librairies.
