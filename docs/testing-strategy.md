# Stratégie de test frontend

Comment on décide ce qui se teste en unitaire, ce qui passe par un smoke, et comment les smokes deviennent des e2e. Le déroulé du ticket, lui, vit dans `docs/workflow-ticket-frontend.md`.

## Trois niveaux, mais deux seulement dans le tri de l'inventaire

L'inventaire (étape 1) classe chaque RM sur **deux** niveaux : unitaire ou smoke. Un
**troisième** niveau, l'e2e Playwright, s'ajoute en fin d'étape 3, **après** le code : il
**transcrit chaque smoke** en test exécutable. Le smoke reste la source (le scénario en
langage humain), l'e2e en est la version qui tourne toute seule. Il ne sort pas du tri de
l'inventaire : c'est une couche posée par-dessus, pas un état que le test-planner attribue à
une RM.

- **Test unitaire (TU)** — Vitest, sur des fonctions pures de `src/logic/`, sans rendu,
  dépendances externes remplacées par des doublures. Déterministe et rapide. **Le seul
  niveau rejoué en CI.**
- **Smoke (ST)** — un scénario en langage humain qui décrit un parcours et son résultat
  observable à l'écran. C'est ce que l'inventaire attribue aux RM 🔴. Il n'est plus joué à
  la main : il sert de **source**, transcrite ensuite en e2e.
- **E2e Playwright** — vrai navigateur + vrai backend. **Chaque smoke est transcrit en un
  e2e** (la version exécutable du scénario). Écrit **après** le code de prod, jamais en
  test-first. Lancé à la demande par l'agent, **hors CI**.

## La question de tri, RM par RM

Pour chaque règle métier : **testable en unitaire ?** Trois verdicts :

| État | Sens | Vérifié par |
|---|---|---|
| 🟢 | ce qu'on vérifie est du code à nous (validation, transformation, mapping d'erreur, décision d'affichage) | test unitaire, dépendances mockées |
| 🟠 | une tranche à nous (unitaire) + une tranche réelle | test unitaire **et** smoke (transcrit en e2e) |
| 🔴 | ce qu'on vérifie est le comportement réel d'une dépendance et son branchement | smoke (transcrit en e2e) |

Règle de coupe : si la RM peut échouer alors que notre logique est correcte (parce
que ce qui casse est l'API, le navigateur ou la librairie), ce n'est pas un test unitaire.

On ne classe pas « pour le paquet », on classe **par ce qu'on vérifie**, RM par RM. Un
même paquet peut mélanger les trois états.

## Où passe la frontière, côté frontend

C'est le seul vrai déplacement par rapport au backend. Là où le back avait Better Auth,
Prisma et la contrainte `UNIQUE`, le front a :

**Dépendances (→ pousse vers 🔴)**
- l'API backend : les vraies réponses, les vrais codes d'erreur, la vraie session ;
- le navigateur : rendu, CSS calculé, focus, autofill, navigation réelle ;
- React, React Router, base-ui / shadcn.

**Notre code (→ 🟢)**
- validation client : format d'email, mot de passe ≥ 8 caractères, champ requis ;
- normalisation : trim et minuscules sur l'email ;
- décision d'état : le bouton de soumission est-il activé ;
- mapping d'un code d'erreur API vers un message affiché
  (`EMAIL_ALREADY_EXISTS` → « Cet email est déjà utilisé »).

Conséquence concrète : **l'unicité de l'email n'est pas une RM frontend.** C'est une
contrainte de base de données. Côté front, la RM devient « quand l'API renvoie
`EMAIL_ALREADY_EXISTS`, le message s'affiche sous le champ » — et ce mapping est du 🟢
unitaire pur.

## Ce qu'on n'utilise pas, et pourquoi

**React Testing Library est hors de ce workflow**, pour 2 raisons selon le niveau de test. **Tests unitaires de composants** : il ne resterait rien d'utile à tester, car les composants d'affichage viennent de shadcn, qui sont déjà testés, et notre logique vit dans `logic/`, en fonctions pures testées avec Vitest. **Tests d'intégration et e2e** : ils passent par Playwright, dans un vrai navigateur, parce que RTL rend les composants dans jsdom, pas
dans un navigateur : pas de CSS calculé (« le champ passe en bordure rouge » est
invérifiable), réseau mocké, router doublé. Utiliser RTL sur une RM 🔴 revient à mocker
exactement ce que le 🔴 voulait vérifier. La rule `tests.md` du repo le dit déjà : le test
de composant est l'exception, et seulement **hors parcours critique**.

> Seul créneau légitime pour RTL : un **comportement inséparable du rendu** qui est à nous
> — par exemple « après une soumission invalide, le focus se déplace sur le premier champ
> en erreur ». Ce n'est pas un smoke, c'est un 🟢 particulier. Aucune RM de KOM-07 ne le
> justifie à ce jour.

## Playwright : transcription de tous les smokes, après le code, hors CI

Playwright entre dans le workflow comme **transcription exécutable de tous les smokes** du
ticket : à chaque scénario de smoke correspond un e2e.

**Ce qu'il couvre** : tous les smokes, sans exception — les happy paths signup / signin /
signout comme les 🔴 « cosmétiques » (bordure rouge, message sous un champ, lien en nouvel
onglet). Le smoke reste la source en langage humain, l'e2e sa version qui tourne toute
seule.

**Quand** : à la fin de l'étape 3, **après** que le code de prod est vert — jamais en
test-first. Écrire des sélecteurs sur une UI qui n'existe pas encore, puis les réécrire à
chaque retouche de maquette, sans CI pour les rejouer, c'est la combinaison la moins
rentable. Une fois le code stable, chaque smoke est transcrit en e2e.

**Comment il tourne — deux suites selon le déterminisme.** Un e2e coûte selon ce qu'il y a
**au bout** du parcours. Un parcours sur backend déterministe tourne en quelques secondes ;
un parcours qui dépend d'un **vrai LLM en streaming** prend plusieurs minutes par scénario et
son résultat **varie** d'un run à l'autre. On les sépare par le suffixe du fichier :

- **Déterministe** (`*.test.ts`, `pnpm test:e2e`) : rapide, reproductible, **jouable en CI**.
- **Non déterministe** (`*.nondet.test.ts`, `pnpm test:e2e:nondet`) : lent, instable, **hors
  CI**, lancé sur demande. Un rouge n'y prouve pas un bug du code, il ne doit jamais bloquer
  une PR. La suite tourne en série (`--workers=1`) car ses scénarios partagent l'état d'un
  seul compte.

Le run est un **contrôle final**, pas un outil de mise au point : on lance chaque suite **au
plus une fois** et on rapporte le résultat, on **n'itère pas** en relançant. Sur la suite
`.nondet`, douze runs à trois minutes font une demi-heure perdue pour le résultat d'un seul.
Aujourd'hui la CI ne rejoue que les unitaires ; la suite déterministe est prête à y entrer,
la `.nondet` reste dehors par nature.

## Format des smokes : langage humain, prêt pour Playwright

Les smokes s'écrivent en français, exécutables par un humain. La discipline de format les
rend transcriptibles en Playwright plus tard, en une passe mécanique :

- **une action nommée par étape**, jamais deux ;
- **désigner les éléments par leur libellé visible**, jamais par une classe CSS ;
- **un résultat attendu observable** à l'écran ;
- une case à cocher par scénario.

```markdown
### SM-3 — Mot de passe trop court : message d'erreur sous le champ

Précondition : dev server lancé, page /signup ouverte.

1. Saisir « Marc » dans le champ « Prénom ».
2. Saisir « marc@test.dev » dans le champ « Email ».
3. Saisir « abc » dans le champ « Mot de passe ».
4. Cliquer sur le bouton « Créer un compte ».

Attendu : le champ Mot de passe passe en bordure rouge, le message
« Le mot de passe doit contenir au moins 8 caractères. » s'affiche sous le champ,
et on reste sur /signup (aucune navigation).

- [ ] Vérifié
```

Pourquoi désigner par le libellé visible : « le champ *Prénom* » et « le bouton *Créer un
compte* » se traduisent directement en `getByLabel('Prénom')` et
`getByRole('button', { name: 'Créer un compte' })`, la manière dont Playwright recommande
de cibler les éléments. Un smoke écrit « vérifier que la validation marche » ne se
convertit jamais. Effet secondaire utile : cette contrainte force des libellés
accessibles corrects dans le code.

---
