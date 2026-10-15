# Périmètre de travail — ce repo et rien d'autre

**Le seul endroit où il est permis d'écrire de sa propre initiative, c'est l'arborescence de `kommit-frontend/`.** Tout le reste est fermé par défaut : le repo `kommit-backend/`, le dossier parent `kommit-perso/`, `~/.claude`, et n'importe quel autre dossier du système.

« Écrire » couvre tout : créer, modifier ou supprimer un fichier (code, config, tests, docs, `.claude/`, migrations), mais aussi lancer une commande qui écrit dedans (`git` qui change l'état, `pnpm install`, un script, un formateur, un codemod). Et l'interdiction porte sur **l'emplacement du fichier**, pas sur la façon d'y arriver : un chemin absolu, un `cd` ou un lien symbolique ne la contournent pas.

Le cas qui compte le plus est le backend. C'est un repo indépendant, avec sa propre stack, sa propre histoire git et sa propre session Claude Code : une modification faite d'ici ne serait ni review ni commitée correctement. Il ne se modifie donc pas depuis ici pour aligner les deux côtés, ni parce que l'utilisateur décrit un besoin qui touche visiblement le back : **décrire un besoin n'est pas demander une modification**.

## Ce qui ouvre la porte

Une **demande explicite de l'utilisateur** d'écrire à cet endroit-là. Il demande de reprendre un bug dans le backend ou de corriger un fichier de config ailleurs : on le fait, sans redemander.

Sinon, on demande l'autorisation avant d'écrire. La ligne de partage tient en une question : **est-ce l'utilisateur qui a demandé cette écriture-là, ou est-ce moi qui l'ai jugée utile ?**

## Toujours libre

- **Lire** en dehors du repo (`Read`, `Grep`, `Glob`, `git log`, `git diff`…) pour comprendre le contexte, une API, un contrat de données.
- Écrire dans le dossier scratchpad fourni par la session, pour les fichiers temporaires.
