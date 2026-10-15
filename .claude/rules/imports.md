# Imports — frontend

Le projet utilise l'alias `@/` qui pointe sur `src/`.

## La règle

**Alias `@/` pour tout import interne.** `import X from '@/components/ui/Logo'`, jamais `'../../ui/Logo'`. Ça reste lisible et ne casse pas quand on déplace un fichier.

**Toujours `@/`, y compris pour un voisin du même dossier** — un test vers sa prod s'écrit `@/logic/commits/format/format`. Ni `./` ni `../` dans `src/`.

Les imports de paquets externes (`react`, `zod`…) restent des specifiers nus.

## Exception : `e2e/`

Le dossier `e2e/` est à la racine du repo, donc **hors de `src/`, donc hors de portée de l'alias**. Un import entre fichiers de `e2e/` se fait en relatif — c'est la seule option, `@/` ne peut pas les atteindre.

## Où l'alias est câblé

`paths` dans le `tsconfig`, et `vite-tsconfig-paths` pour que Vite et Vitest le résolvent. Quand un import en `@/` ne résout pas, vérifier ces 2 réglages avant de retomber sur un chemin relatif.
