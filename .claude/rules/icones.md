# Icônes — toujours `lucide-react`

Toute icône affichée dans l'interface vient du paquet `lucide-react`, sans exception. C'est la bibliothèque d'icônes déclarée dans `components.json` (`"iconLibrary": "lucide"`) et celle qu'utilisent les composants générés par shadcn/ui.

## Interdit

- Écrire un `<svg>` à la main dans un composant, même court, même « juste pour un chevron ».
- Utiliser un emoji ou un caractère pictographique comme icône (✅, ❌, ⚠️, →, ★…), que ce soit dans du JSX, un libellé de bouton ou le texte d'un toast.
- Ajouter une autre bibliothèque d'icônes (`react-icons`, `heroicons`, `@tabler/icons`, Font Awesome, une police d'icônes…).
- Importer un fichier `.svg` comme composant ou comme image pour servir d'icône.

## À faire

Importer l'icône depuis `lucide-react` et la styler avec les classes Tailwind du projet :

```tsx
import { CircleCheckIcon } from 'lucide-react'

<CircleCheckIcon className="size-4 text-emerald-600" />
```

Si l'icône voulue n'existe pas dans Lucide, ne pas la dessiner à la main : le dire et demander quoi faire (choisir l'icône Lucide la plus proche, ou décider ensemble d'une exception).

## Pourquoi

Une seule source d'icônes garde un rendu homogène (même grille, même épaisseur de trait, même façon de dimensionner avec `size-*`), évite de multiplier les dépendances qui font le même travail, et rend une icône remplaçable en changeant un import. Un emoji, lui, s'affiche différemment selon le système d'exploitation et ne se colore pas.

## Périmètre logo

Cette rule vise les **icônes** d'interface. Un logo ou une illustration n'est pas une icône : ces cas se discutent au moment où ils se présentent.
