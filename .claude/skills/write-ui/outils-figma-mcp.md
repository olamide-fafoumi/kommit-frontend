# Outils de lecture du MCP Figma

Référence : quel outil rend quoi, et **lequel fait foi** pour chaque type d'information. À lire avant d'extraire une maquette Figma (cf. `SKILL.md`, section « Source Figma (MCP) »).

> Il n'existe **pas** de `get_code` dans ce MCP : l'outil qui rend le code s'appelle `get_design_context` (d'anciennes versions le nommaient `get_code`).

## Les cinq outils de lecture

| Outil | Ce qu'il rend | Fiable pour | Quand l'utiliser |
|---|---|---|---|
| **`get_design_context`** | Le **code généré** du nœud (JSX + classes Tailwind) | La **structure** et les classes | Point de départ de l'intégration : c'est le brut qu'on sauvegarde dans `code-brut/` |
| **`get_metadata`** | La **carte structurelle** : id, nom, type, **position (x/y) et dimensions (w/h)** de chaque nœud. Pas de code | Les **dimensions et positions réelles** | Dès qu'une **taille est douteuse** ou compte visuellement |
| **`get_screenshot`** | L'**image** du nœud | **Comprendre le flux / l'agencement** | Voir à quoi ça ressemble, les états d'un parcours. **Jamais** pour une valeur |
| **`get_variable_defs`** | Les **variables / tokens** de design (couleurs, espacements nommés) | Les **tokens nommés** | Mapper vers les variables CSS du projet au lieu de coder en dur |
| **`download_assets`** | Télécharge les **SVG / PNG** | Les assets | Récupérer icônes/images (les URLs Figma expirent en 7 jours) |

**Règle de tri, en une phrase :** `get_design_context` pour le squelette, `get_metadata` pour les chiffres exacts, `get_screenshot` pour comprendre, `get_variable_defs` pour les tokens, `download_assets` pour les images.

## Le piège : le code n'est PAS fiable pour les dimensions

`get_design_context` génère du code qui peut **figer ou fausser une taille**. Concrètement, un élément dimensionné en `Fill` dans Figma (largeur/hauteur élastiques) est parfois traduit en **valeur fixe** dans le code — ce qui casse le comportement voulu.

**Cas vécu (heatmap de contributions) :**
- La maquette : chaque cellule est en `Fill × Fill`, résolue à **12.264 × 12.264** → un **carré** qui remplit la largeur.
- Le code de `get_design_context` : `grid-rows: 14.53px` (hauteur figée) + colonnes `1fr` (largeur élastique) → des **rectangles**. En prime, le `14.53` ne correspond même pas au vrai nœud.
- `get_metadata` sur la même cellule : `width="12.264" height="12.264"` → la **vérité**, et deux nombres égaux **révèlent directement le carré**.

**Conséquence pratique :** dès qu'une **valeur de dimension** compte, la vérifier sur `get_metadata`, pas dans le code. Le code sert à la structure et aux classes ; `get_metadata` fait foi pour les tailles et positions.

### Limite de `get_metadata`

`get_metadata` rend des **valeurs résolues en pixels**, pas le **mode de dimensionnement** (`Fill` / `Hug` / `Fixed`). Il ne met pas l'étiquette « Fill » — mais les chiffres suffisent souvent à déduire l'intention : deux dimensions **égales** = carré, une valeur qui **change avec la largeur du conteneur** = élastique. Pour lever un doute sur le mode lui-même, l'inspecteur Figma (via un screenshot de la sélection) le montre explicitement (`12.26 Fill × 12.26 Fill`).
