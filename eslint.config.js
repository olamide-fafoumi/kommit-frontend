import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    // Câblage manuel des plugins React : on les enregistre comme objets et on
    // active leurs règles à la main, sans passer par leur preset (au vieux
    // format « plugins: [] », refusé par ESLint 10).
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Stubs test-first : un paramètre encore non utilisé, préfixé par _, est
      // toléré (l'implémentation le renomme quand elle s'en sert).
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Imports internes via l'alias @/ (jamais ./ ni ../). Le regex attrape tout chemin
      // relatif, imbriqué ou non ; @/ et les paquets externes passent.
      'no-restricted-imports': ['error', {
        patterns: [{
          regex: '^\\.\\.?/',
          message: "Imports internes : utilise l'alias @/, jamais un chemin relatif (./ ou ../).",
        }],
      }],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // Les e2e vivent hors de `src/`, donc l'alias `@/` (qui pointe sur `src/`) ne peut pas
  // adresser un helper voisin sous `e2e/support/`. Le relatif y est la seule voie possible
  // et la norme des suites Playwright : on lève l'interdiction des imports relatifs pour ce
  // dossier (le reste du linter s'y applique toujours).
  {
    files: ['e2e/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
])
