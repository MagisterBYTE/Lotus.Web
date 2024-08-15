import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintImport from 'eslint-plugin-import';
import eslintStorybook from 'eslint-plugin-storybook';

export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'import': eslintImport,
      'storybook': eslintStorybook
    }
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js', 'rollup.config.js', 'rollup.config.mjs', '.storybook']
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
        ecmaFeatures: { jsx: true },
      }
    }
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // eslint
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
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

      // eslint-plugin-react
      'react/jsx-pascal-case': ['error'],
      'react/no-danger': ['error'],
      'react/sort-comp': ['error'],
      'react/boolean-prop-naming': ['error', { 'propTypeNames': ['bool', 'mutuallyExclusiveTrueProps'] }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/self-closing-comp': ['error', { component: true, html: true }],

      // eslint-plugin-import
      "import/order": ["warn", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index"] }]
    }
  }
);