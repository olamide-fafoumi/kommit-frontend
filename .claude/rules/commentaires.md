# Commentaires — seulement les utiles, et courts

Un commentaire ne se justifie que s'il apporte une information **que le code ne dit pas déjà**. Par défaut, ne pas commenter.

## Ce qui mérite un commentaire

- Le **pourquoi** non évident : une décision, un piège, une contrainte, un lien vers une règle métier du ticket. Ex. « le bouton reste désactivé tant que la requête est en vol (RM6) ».
- Un choix contre-intuitif qu'un lecteur voudrait « corriger » sans le contexte.

## Ce qui ne mérite pas de commentaire

- **Paraphraser** un nom de variable, de fonction ou de prop. Si `handleDismiss` ou `initialFocus` sont clairs, ne pas les réexpliquer.
- **Réécrire ce qu'une librairie documente déjà.** Le nom d'un prop + sa description au survol (l'infobulle de l'IDE) suffisent. Ne pas recopier le comportement de la lib en commentaire.
- Décrire une ligne qui **se lit d'elle-même**.

## Quand il est utile, il reste court

Une phrase, une ligne. Jamais une deuxième ligne qui re-justifie ou détaille le mécanisme. Si le commentaire déborde sur plusieurs lignes pour expliquer un comportement de lib, c'est le signe qu'il ne fallait pas le mettre.

- ✗
  ```tsx
  // À l'ouverture, on ne déplace le focus sur AUCUN élément (sinon la lib
  // focalise le premier tabbable, la croix, et son anneau de focus apparaît).
  initialFocus={false}
  ```
- ✓ `initialFocus={false}` — le nom du prop et sa doc au survol disent déjà tout.

## Test avant d'écrire un commentaire

« Est-ce que quelqu'un qui connaît la stack comprend déjà le code sans ce commentaire ? » Si oui, ne pas l'écrire (ou le supprimer).
