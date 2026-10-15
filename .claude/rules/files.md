# Conventions de fichiers

Comment on organise les fichiers dans le projet — valable **partout**.

## Un fichier = une unité

- **Un composant par fichier.** Jamais deux composants exportés depuis le même fichier (pas de fichier « barrel » de composants qui regroupe `UserIcon` + `ArrowIcon`). Un composant = un fichier à son nom, export par défaut.
- **Un SVG par fichier.** Chaque illustration/asset SVG vit dans son propre fichier `.svg`. Jamais plusieurs SVG entassés dans un même fichier.
- Exception unique : un sous-composant purement privé, jamais réutilisé et trivial, peut rester dans le fichier de son parent — mais dès qu'il a un nom propre ou qu'il pourrait être importé ailleurs, il sort dans son fichier.

## Nommage des fichiers

**Un fichier qui exporte un composant React est en PascalCase**, au nom exact du composant : `Navbar.tsx`, `PageHeading.tsx`, `TextField.tsx`. Le fichier et le composant portent le même nom, toujours.

**Tout le reste est en camelCase**, sans point ni tiret : `queryKeys.ts`, `validation.ts`, `format.ts`. Vaut pour `logic/`, `lib/`, `data/` et `types/`.

**Exception assumée : les composants générés par shadcn restent en kebab-case** (`alert-dialog.tsx`, `card.tsx`, `sonner.tsx`). C'est la convention de la CLI, qui les régénère sous ce nom. **Ne pas les renommer** : la prochaine commande `shadcn add` recréerait le fichier en kebab-case à côté du tien. Un composant écrit à la main dans `components/ui/`, lui, suit la règle PascalCase.

## Modules groupés par domaine

**Un module = un domaine.** Dès qu'un fichier regroupe plusieurs domaines indépendants
(qui ne partagent ni état ni type propre), il s'éclate, un fichier par domaine. Vaut pour
`src/lib/` comme pour `src/logic/`. Le critère n'est pas la longueur du fichier mais le
nombre de domaines qu'il empile : un fichier long mais mono-domaine reste d'un bloc.

Cas particulier de la logique métier : dans `src/logic/`, on descend à **deux niveaux
de dossier**. Chaque unité de logique a son **dossier-fichier** (nommé comme elle,
contenant `<nom>.ts` et son `<nom>.test.ts`), et ces dossiers-fichiers sont ensuite
**regroupés par domaine**. On n'a jamais de `.ts` posé à plat, ni à la racine de
`logic/`, ni directement dans un dossier de domaine. C'est l'organisation du backend, où
`src/services/` est déjà groupé par domaine.

- **Un dossier-fichier par unité, prod et test dedans.** `commits/format/format.ts` +
  `commits/format/format.test.ts` dans le même dossier `format/`. Jamais
  `commits/format.ts` à plat.
- **Ces dossiers-fichiers se regroupent par domaine.** Un dossier de domaine (`user/`,
  `commits/`) contient des dossiers-fichiers, jamais des `.ts` directs :
  `user/validation/validation.ts`, `user/error/error.ts`, `commits/format/format.ts`.
- **Un fichier isolé sans domaine garde quand même son dossier-fichier**, à la racine de
  `logic/` (`<nom>/<nom>.ts` + `<nom>/<nom>.test.ts`), jamais un `.ts` nu. Dès qu'un
  deuxième fichier du même domaine apparaît, leurs dossiers-fichiers passent ensemble sous
  un dossier de domaine.
- **Pas de préfixe de domaine ni de répétition dans le nom.** Le dossier de domaine porte
  déjà le domaine : `user/validation/validation.ts`, jamais `user/userValidation/...`. (Le
  backend garde le préfixe ; ici on ne le double pas.)
- **Pas de barrel `index.ts`.** Les imports pointent le fichier précis, nom répété :
  `@/logic/commits/format/format`, `@/logic/user/validation/validation`, jamais un
  `index` qui ré-exporte le dossier.

**Pourquoi :** un dossier plat de vingt modules oblige à lire chaque nom pour retrouver ce
qui va ensemble ; le préfixe dans le nom (`commitsFormat`, `commitsTitle`) fait à la main
le travail qu'un dossier fait mieux. Le regroupement par domaine se voit à l'œil, aligne le
front sur le back, et rend un domaine déplaçable d'un bloc.

## Fichiers de test

- **Colocalisés : le test vit à côté de ce qu'il teste.** `format.ts` → `format.test.ts` dans le même dossier ; `SignupForm.tsx` → `SignupForm.test.tsx` à côté. Jamais dans un dossier `tests/` séparé qui duplique l'arborescence.
- **Convention de nommage : `<nom>.test.ts` / `<nom>.test.tsx`** (le défaut de Vitest).
- **Pourquoi :** le test suit le fichier quand on le déplace, la couverture se voit à l'œil (un fichier sans `.test` à côté = un trou visible), et `logic/` reste homogène — que de la logique pure et ses tests purs.
- **Exception : le end-to-end.** Un parcours Playwright ne teste aucun fichier précis, il traverse toute l'app → dossier dédié `e2e/` à la racine, jamais colocalisé.
