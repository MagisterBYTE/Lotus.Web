import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintImport from 'eslint-plugin-import';

export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import': eslintImport,
    }
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js', 'rollup.config.js']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions:
    {
      globals:
      {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions:
      {
        project: ['tsconfig.json'],
      }
    }
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // eslint
      'quotes': ['error', 'single'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'brace-style': ['error', 'allman', { 'allowSingleLine': true }],
      'padded-blocks': ['error', { 'blocks': 'never' }],
      'prefer-const': 'error',
      'comma-dangle': ['warn', 'never'],
      'consistent-return': ['error', { 'treatUndefinedAsUnspecified': true }],
      'no-inner-declarations': 'error',
      'no-unused-vars': 'off',
      'spaced-comment': ['error', 'always', { 'markers': ['/'] }],
      'max-lines': ['warn', { max: 1200 }],
      'max-len': ["error", { "code": 150, "tabWidth": 2, "ignoreComments": true }],

      // eslint-plugin-import
      "import/order": ["warn", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index"] }]
    }
  }
);