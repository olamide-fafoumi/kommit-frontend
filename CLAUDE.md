# kommit-frontend

Repo du frontend de Kommit. Stack : React 18 + TypeScript v6 + Tailwind + ShadCN (Base UI) + Vite.

## Arborescence

```
kommit-frontend/
├── CLAUDE.md              # ce fichier
├── .claude/
│   ├── rules/             # règles du projet
│   └── skills/            # skills Claude Code (à compléter)
├── .vscode/               # configuration VS Code
├── src/
│   ├── main.tsx           # point d'entrée : monte l'app
│   ├── App.tsx            # assemblage de l'app
│   ├── index.css          # styles globaux
│   ├── components/        # composants
│   │   ├── ui/            # composants génériques (shadcn)
│   │   └── pages/         # composants spécifiques par écran
│   ├── lib/               # infra (API, client requêtes...)
│   │   └── utils.ts       # helper cn() pour Tailwind
│   ├── logic/             # logique métier (fonctions pures)
│   ├── data/              # contenu statique
│   ├── types/             # contrat d'API
│   └── assets/            # images
├── e2e/                   # tests Playwright
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── components.json        # config shadcn
```

## Conventions du projet

Voir le dossier `.claude/rules/` pour les règles détaillées.
