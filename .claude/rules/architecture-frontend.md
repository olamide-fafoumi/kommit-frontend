# Architecture — frontend

Le découpage est **par couche technique**, pas par écran. Cette structure est figée : ne pas en inventer une autre, ne pas ajouter de dossier de premier niveau sous `src/` sans accord explicite de l'utilisateur.

```
src/
├── main.tsx          # point d'entrée : monte l'app dans le DOM. Rien d'autre.
├── App.tsx           # assemblage de l'app : providers et routes.
├── components/       # l'affichage. Deux sous-dossiers, pas un de plus.
│   ├── ui/           # les composants génériques, réutilisés par 2+ écrans.
│   └── pages/        # un dossier par écran, avec ses morceaux spécifiques.
├── logic/            # la logique métier. Ne connaît ni React, ni le DOM, ni le réseau.
├── lib/              # la couche infra : ce qui parle à l'extérieur.
│   └── api/          # le seul endroit qui connaît le réseau.
├── data/             # le contenu statique des écrans (textes, labels).
├── types/            # le contrat d'API partagé avec le backend.
└── assets/           # les images utilisées au runtime.
```

## Le rôle de chaque emplacement

**`main.tsx`** — il monte l'app dans le DOM et importe la feuille de style globale. Aucune route, aucun provider ici.

**`App.tsx`** — il assemble : les providers (client de requêtes, router…) puis la déclaration des routes. Il ne contient aucun morceau d'interface.

**`components/ui/`** — tout ce qui est **générique et réutilisé par 2 écrans ou plus** : boutons, champs, cartes, logo, titres. C'est aussi là que la CLI shadcn dépose les composants qu'elle génère.

**`components/pages/<Écran>/`** — la page **et tous ses morceaux spécifiques** groupés dans son dossier : son header, ses sections, ses cartes. Un composant reste ici tant qu'un seul écran l'utilise ; il ne remonte dans `ui/` que le jour où un 2ᵉ écran le réutilise.

**Pas de 3ᵉ dossier sous `components/`.** Ni `layout/`, ni `shared/`, ni `common/`, ni `features/`. Un header ou un footer employé par un seul écran vit dans le dossier de cet écran. Et rien à la racine de `src/` : pas de `src/pages/` séparé.

**`logic/`** — la logique métier, en fonctions pures qui prennent et rendent des données. **Elle n'importe ni React, ni un composant, ni `lib/api/`** : elle doit rester appelable depuis un test sans navigateur et sans réseau. C'est l'équivalent frontend de la couche `services/` du backend.

**`lib/`** — la couche **infra** : tout ce qui adapte le monde extérieur au projet, et rien d'autre. Ni métier, ni affichage.

- **`lib/api/`** est le seul endroit qui connaît le réseau : l'URL de l'API, la forme des erreurs, un fichier par domaine, et les clés de cache. C'est l'équivalent frontend de la couche `repositories/` du backend : le seul endroit qui sait *comment* on va chercher les données.
- La configuration des librairies tierces (client de requêtes…) vit à la racine de `lib/`.
- **Exception assumée : `lib/utils.ts`.** Il ne contient que `cn()`, le helper de fusion de classes CSS, qui est une fonction pure et n'adapte donc rien. Il est là parce que c'est l'emplacement par défaut de shadcn, déclaré dans `components.json` sous `aliases.utils`. **Ne pas le déplacer** : tous les composants générés importent `cn` depuis cet alias, et la CLI le régénérerait à cet endroit. Cette exception ne s'étend à rien d'autre : aucun autre helper pur ne se range dans `lib/`, sa place est dans `logic/`.

**`data/`** — le **contenu statique des écrans** : titres, labels, placeholders, libellés de boutons, textes de pied de page. Ce ne sont pas des bouchons en attendant l'API, ces fichiers restent quand l'API arrive. Une donnée qui vient du serveur ne se range jamais ici.

**`types/`** — le contrat d'API partagé avec le backend. Son vocabulaire se reprend tel quel, voir `code-naming.md`.

**`assets/`** — uniquement les images réellement utilisées au runtime, en noms sémantiques.

## Sens des dépendances

`components/` → `logic/` et `components/` → `lib/api/`, jamais l'inverse.

- Un composant peut appeler la logique métier et déclencher une requête.
- **`logic/` n'importe jamais un composant ni `lib/api/`.** Si une fonction métier a besoin d'une donnée du serveur, elle la reçoit en paramètre.
- **`lib/api/` n'importe jamais un composant ni `logic/`.** Il transporte des données, il ne décide rien.
- `data/` et `types/` ne dépendent de rien : ce sont des feuilles.

Le test, quand on hésite sur un fichier : **est-ce qu'il décide (logic), est-ce qu'il affiche (components), ou est-ce qu'il parle à l'extérieur (lib) ?**

## Où vit un fichier et son test

Le rangement d'un fichier et de son test suit `files.md` : le test est colocalisé, à côté de ce qu'il couvre.
