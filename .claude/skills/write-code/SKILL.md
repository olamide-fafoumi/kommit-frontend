---
name: write-code
description: Écrit la logique métier frontend jusqu'à faire passer au vert les tests rouges du ticket (écrits par unit-test-writer), ou à défaut jusqu'à satisfaire les scénarios de smoke (testing/smokes-<TICKET_ID>.md) + le ticket. Crée les fonctions pures dans src/logic/, les appels réseau dans src/lib/api/, et les branche sur les composants de l'étape 0, selon les conventions du repo. N'impose aucun découpage, l'unité de travail se lit dans les tests. Utiliser quand l'utilisateur dit "write-code", "implémente la logique", "fais passer les tests", "make it green", "passe au vert", "étape 3".
---

## Entrée

- Le **cahier des charges**, dans cet ordre de priorité :
  - les **tests unitaires rouges** du ticket, s'ils existent (écrits par `unit-test-writer`, sous `src/logic/`) ;
  - **sinon**, les **scénarios de smoke** (`testing/smokes-<TICKET_ID>.md`, écrits par `smoke-test-writer`) + le ticket. Ils jouent le même rôle que les tests rouges : ils fixent les comportements, les messages et les navigations attendus.
- Les **composants de l'étape 0** (produits par `/write-ui`), dont les états sont déjà exprimables par props.
- Le **contrat d'API** (`src/types/apiContract.ts`) + les **rules du repo** (couches, nommage, imports).
- Optionnel : une **tranche précise** à traiter maintenant (un fichier de test, une fonction). Sans précision, on avance jusqu'à ce que toute la suite soit verte.

## Sortie

- Le code frontend qui fait passer le cahier des charges : les fonctions pures dans `src/logic/`, les appels réseau dans `src/lib/api/`, et leur branchement sur les composants, selon les conventions du repo.
- **Avec tests unitaires** : les tests concernés au vert (`pnpm test:run`), plus `pnpm build` (typecheck) et `pnpm lint` qui passent.
- **Sans tests unitaires** : l'app démarre (`pnpm dev`), et `pnpm build` et `pnpm lint` passent.
- Un **rapport** de ce qui est prêt, et la proposition de lancer `e2e-test-writer` pour transcrire les smokes en e2e.

---

## Ne pas découper par paquet de règles

Les paquets du ticket groupent les règles **par thème** ; le code groupe **par fonction**. Une même fonction sert souvent des règles de plusieurs paquets : le choix du message d'erreur d'après le `code` de l'`ApiError` sert à la fois le signup et le signin. Imposer la frontière du paquet à l'implémentation force à n'écrire que la moitié d'une fonction, donc à boucher le trou avec une valeur de remplissage, puis à revenir la démonter ensuite.

Comme tous les tests rouges existent déjà (étape 2 du workflow), **l'unité se lit d'elle-même** : ouvrir un fichier de test, écrire la fonction **en entier** pour faire passer tous ses tests, passer au suivant.

Le code sans tests unitaires (appel réseau, branchement sur un composant, navigation) forme ses propres tranches, pilotées par leurs scénarios de smoke.

## Règles

- **Décision structurante → mode plan d'abord.** Si l'implémentation implique une nouvelle dépendance, un nouveau dossier de premier niveau sous `src/`, ou un changement de la structure des composants de l'étape 0 : passer en mode plan, présenter le plan, et **attendre l'aval explicite de l'utilisateur** avant d'exécuter quoi que ce soit. Sans décision structurante, implémenter directement.
- Le cahier des charges (tests unitaires ou scénarios de smoke) définit ce qui doit être implémenté, **rien de plus, rien de moins**. Si un comportement n'y figure pas, ne pas l'inventer.
- Ne JAMAIS modifier un test pour le faire passer. Si un test (ou un scénario) semble faux, demander à l'utilisateur.
- **Écrire une fonction en entier**, avec toutes les branches que ses tests exigent. Ne jamais laisser une valeur de remplissage pour un cas « traité plus tard ».
- La logique métier vit dans `src/logic/`, en fonctions pures qui n'importent ni React, ni un composant, ni `src/lib/api/`. Avant de mettre de la logique dans un composant, se poser la question de la rule `tests.md` : « puis-je la sortir dans une fonction sans rendu ? » Si oui, on l'extrait.
- Les composants de l'étape 0 ne changent pas de structure : on leur passe des props et des handlers, on ne les réécrit pas.
- Suivre les conventions des rules du repo (couches, nommage, imports en alias `@/`) : ne pas réinventer la structure.

## Étapes

| Étape | Nom | Description |
|-------|-----|-------------|
| 1 | Lire le cahier des charges | Les tests rouges s'ils existent, sinon les scénarios de smoke + le ticket |
| 2 | Lire le contrat et les conventions | Contrat d'API, composants de l'étape 0, rules du repo |
| 3 | Implémenter | `src/logic/` (fonctions pures), puis `src/lib/api/`, puis le branchement sur les composants |
| 4 | Vérifier | Tests au vert + build + lint, ou, sans tests unitaires : app qui démarre + build + lint |
| 5 | Remettre la main | Rapporter ce qui est prêt, et proposer de lancer `e2e-test-writer` |

## Étape 1 : Lire le cahier des charges

**S'il y a des tests unitaires**, parcourir les fichiers de test concernés. Pour chaque test, identifier :

- la fonction appelée et ses paramètres d'entrée ;
- le résultat attendu ;
- les cas limites couverts ;
- ce que les **mocks** renvoient : c'est la forme des données externes que le vrai code devra consommer.

**Sinon**, parcourir les scénarios de smoke dans `testing/smokes-<TICKET_ID>.md` + le ticket. Chaque scénario fixe les étapes dans le navigateur et le résultat attendu à l'écran. L'implémentation doit faire passer ces scénarios **tels qu'ils sont écrits**, avec les libellés qu'ils ciblent : `e2e-test-writer` les transcrira ensuite tels quels.

Dans les 2 cas, le cahier des charges dicte le périmètre. Ne pas deviner des comportements qui n'y sont pas.

## Étape 2 : Lire le contrat et les conventions

- **Contrat d'API** (`src/types/apiContract.ts`) : les endpoints, les formes de réponse, les codes d'erreur.
- **Composants de l'étape 0** : les props par lesquelles leurs états (erreur, bouton désactivé, chargement) sont déjà exprimables.
- **Conventions du repo** : le découpage en couches et le sens des imports vivent dans `architecture-frontend.md`, déjà chargé en contexte. **L'implémentation doit s'y conformer.** Ce skill ne redécrit pas la structure, la rule fait autorité.

## Étape 3 : Implémenter

Écrire le code dans l'**ordre des dépendances** : d'abord `src/logic/` (le cœur testé), puis `src/lib/api/` (les appels réseau), puis le branchement sur les composants (state, handlers, navigation).

## Étape 4 : Vérifier

**Avec tests unitaires**, les lancer après chaque changement significatif (`pnpm test:run`).

- Si un test échoue → corriger **l'implémentation**, pas le test.
- Si un test semble faux → le **signaler à l'utilisateur**, ne pas le modifier sans validation.

**Sans tests unitaires**, démarrer l'app (`pnpm dev`) et vérifier qu'elle tient : pas d'erreur au chargement, les pages du ticket s'affichent.

Dans les 2 cas, `pnpm build` (typecheck via `tsc -b`) et `pnpm lint` doivent passer.

## Étape 5 : Remettre la main

Les tests unitaires mockent le réseau, et une app qui démarre ne prouve pas le comportement réel dans le navigateur. Les scénarios de smoke restent donc à vérifier, en les transcrivant en e2e.

Rapporter :

- ce qui a été implémenté (fichiers) ;
- l'état des vérifications (tests verts ou app qui démarre, build, lint) ;
- toute précondition pour les e2e (backend lancé sur `http://localhost:3000`, `.env`).

Puis **proposer de lancer l'agent `e2e-test-writer`**, qui transcrit chaque smoke en test Playwright. Ne pas le lancer sans l'accord de l'utilisateur.
