# Vocabulaire de la maquette Figma

Les mots employés dans `/write-ui`, `mockup-code-fetcher`, `mockup-flow-describer` et `workflow-ticket-frontend.md` pour parler de la maquette.

## Hiérarchie (du plus grand au plus petit)

**Maquette → Feature → Page → État → Frame**

- **Maquette** : le fichier Figma entier. Exemple : « Kommit maquettes ».
- **Feature** : un bloc de la maquette qui regroupe tout le parcours d'une fonctionnalité. Exemple : « F1 - Flow total (Authentification) ».
- **Page** : une page de l'appli. Exemples : la page d'accueil, la page de connexion, etc.
- **État** : une variante d'une même page. Exemple : le signup vide, rempli, en erreur, ou l'accueil connecté avec son toast.
- **Frame** : un carré blanc de la maquette, qui capture l'état d'une page comme un cliché ou un photo d'une page à un instant T. Exemple : les 3 états du signup sont capturés dans 3 frames différentes.
- **Node-id** : l'identifiant unique d'un élément du fichier Figma. Dans Figma, tout élément est un node : une frame, un texte, un bouton, une feature. On le voit dans le lien d'une frame, après « Copy link to selection » : `…?node-id=1-11054`. C'est ce numéro que le MCP Figma lit pour savoir quelle frame récupérer.

## Ce que ça donne dans les outils

- Chaque frame a son node-id, qui se retrouve dans le nom des fichiers produits : `F11-01-1-11054.png`.
- `mockup-code-fetcher` produit 1 fichier de code brut par frame, `mockup-flow-describer` 1 screenshot par frame.
- `mockup-flow-describer` signale dans `FLOW.md` quelles frames sont des états d'une même page, pour que `/write-ui` n'en fasse pas des pages distinctes.

## Pourquoi « frame »

C'est le mot que tu lis partout : dans Figma, quand tu sélectionnes un carré blanc, le panneau de droite affiche « Frame ». La doc du MCP Figma l'emploie aussi.

Dans Figma, une feature est elle aussi une frame. Dans ce projet, on l'appelle toujours « feature », pour ne pas les confondre.

## Le mot qu'on n'emploie pas : « écran »

« Écran » peut vouloir dire une page ou une frame. Pour éviter l'ambiguïté, on ne l'emploie pas. Seule exception : « écran Stitch », le nom qu'utilise Google Stitch.
