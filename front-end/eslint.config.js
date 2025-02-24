const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportPlugin = require('eslint-plugin-simple-import-sort');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = [
  eslintPluginPrettierRecommended,
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts'],
    plugins: {
      'unused-imports': unusedImportsPlugin,
      'simple-import-sort': simpleImportPlugin,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/no-unresolved': 'off',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/attributes-order': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/no-any': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
];
