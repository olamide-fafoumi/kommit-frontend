# Tests

Comment on écrit les tests dans ce projet. Impératifs, valables **partout**.

## Logique métier → `logic/` + Vitest (par défaut)

- La logique métier vit dans `src/logic/`, en fonctions pures. **Aucun fichier de `logic/` n'importe React.**
- On la teste avec **Vitest**, sans rendu. C'est le test par défaut.
- Avant de rendre un composant pour le tester, se demander : **puis-je sortir cette logique dans une fonction sans rendu ?** Si oui → on extrait, on teste en Vitest, il ne reste rien à tester au niveau composant.

## Test de composant (RTL) → l'exception, pas le défaut

On ne rend un composant pour le tester que dans deux cas :

- **Comportement inséparable du rendu** : focus piégé, `resize`, glisser-déposer — pas de forme « fonction pure » possible.
- **Câblage d'un flux frontend** hors parcours critique, qu'on retesterait sinon à la main.

Assertions **par rôle et par texte** (`getByRole`, `getByText`), jamais par structure (classe CSS, état interne, nom de composant).

## Ne pas tester

- **Ce qu'une librairie garantit déjà** : le comportement des composants shadcn/ui — via sa primitive, Base UI par défaut ou Radix (Échap, focus, clic dehors) — les primitives Zod (`.email()`, `.min()`), le câblage react-hook-form. Les tester = tester la librairie.
- **Le rendu statique** (« tel texte s'affiche ») et les constantes.

## Backend

- Les tests d'intégration backend tapent une **vraie base / un vrai serveur**, jamais un mock. Une route est un assemblage (routeur, middlewares, validation, session, base) ; tester la fonction en l'appelant directement saute les étapes qui cassent le plus.

## End-to-end

- Un parcours Playwright teste un **flux réel** (vrai front + vrai back), sur le chemin critique. Il ne teste aucun fichier précis → dossier `e2e/` dédié à la racine (cf. `files.md`).

## Emplacement des fichiers

- Tests unitaires et de composant **colocalisés** à côté du fichier testé ; e2e dans `e2e/`. Détail : `files.md`.
