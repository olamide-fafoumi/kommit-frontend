# Boutons — toujours `cursor-pointer`

Tout élément cliquable qui se comporte comme un bouton affiche le curseur main (`cursor-pointer`) au survol, sans exception : un `<button>`, un composant `Button` de shadcn, un lien stylé en bouton, une div/span rendue cliquable via `onClick`.

## Pourquoi

Le reset de Tailwind v4 (preflight) met les `<button>` en `cursor: default`, contrairement à l'ancien comportement du navigateur. Un bouton sans `cursor-pointer` ne signale donc plus qu'il est cliquable : c'est une régression silencieuse à corriger partout.

## À faire

- **Composant `Button` (shadcn)** : `cursor-pointer` vit dans la classe de base de `buttonVariants` (`src/components/ui/button.tsx`), pour que chaque bouton du projet en hérite d'un coup. Ne pas le répéter à chaque usage.
- **`<button>` natif** écrit à la main (croix de fermeture, icône cliquable…) : ajouter `cursor-pointer` dans son `className`.
- **Élément non-bouton rendu cliquable** (`onClick` sur une `div`, un `span`) : même règle, `cursor-pointer` obligatoire — et se demander d'abord si ça ne devrait pas être un vrai `<button>`.

## Interdit

- Un bouton désactivé ne prend pas `cursor-pointer` : il reste en `cursor-not-allowed` ou au curseur par défaut (c'est déjà ce que gère `disabled:pointer-events-none` sur le `Button`).
