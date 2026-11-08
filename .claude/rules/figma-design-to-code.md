# Figma design-to-code

La source de vérité d'une maquette Figma est `get_design_context` (MCP), **pas** les screenshots.

- Un screenshot sert à **comprendre le flow**, jamais à extraire une valeur (couleur, taille, police, icône) ni à implémenter.
- Pour intégrer une maquette Figma → suivre le skill **`write-ui`** (section « Source Figma (MCP) ») : extraire chaque frame en fichier brut **avant** d'implémenter, puis implémenter **depuis les fichiers**.
- Toujours **télécharger et commiter les assets** du MCP (les URLs expirent en 7 jours) — jamais les URLs.
- Interdit d'implémenter une valeur vue sur un screenshot sans l'avoir dans un brut MCP.
