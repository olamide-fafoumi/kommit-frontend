# UI & styling

Comment on construit l'interface dans ce projet. Impératifs, valables **partout**.

## shadcn/ui dès que shadcn fournit le composant

- **Le critère : shadcn a-t-il ce composant ?** Si oui — Button, Input, Card, Badge, Dialog, Form, toast (Sonner), menu déroulant, popover… — on installe le composant shadcn, on ne le réécrit pas à la main. Pas seulement pour les composants à comportement : même un `Button` sans comportement compliqué vaut le coup pour son système de variantes (`cva`), sa fusion de classes (`cn`), son API cohérente et son fichier unique à restyler.
- **Tailwind direct pour ce que shadcn ne fournit PAS** : mise en page, conteneurs, grilles, espacements, markup vraiment unique. On ne force pas un composant shadcn sur un `<div>` de layout.
- Autrement dit : shadcn pour les **composants d'interface** (réutilisables, nommés), Tailwind direct pour la **structure** qui les dispose.

## Toujours restyler depuis la maquette

- Un composant shadcn sorti tel quel donne un rendu **générique**, reconnaissable. Après chaque `pnpm dlx shadcn add <composant>`, **restyler le fichier depuis les tokens de la maquette** (couleurs, arrondis, espacements) avant de l'utiliser.
- Le code du composant est copié dans `src/components/ui/` : il t'appartient, tu le modifies directement.

## S'assurer que shadcn est installé

- **Composant manquant** (shadcn déjà initialisé) → l'ajouter sans hésiter : `pnpm dlx shadcn add <composant>`.
- **shadcn pas encore initialisé dans le repo** → l'initialiser, mais en suivant la **procédure d'installation courante pour Tailwind v4** (elle a changé : alias de chemins, `components.json`, config Tailwind). Ne pas deviner la config — vérifier la procédure à jour avant de lancer `init`.
