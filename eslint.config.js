import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
      },
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2021,
        AsyncGenerator: 'readonly',
        AsyncIterator: 'readonly',
        AsyncIterable: 'readonly',
        AsyncIterableIterator: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'semi': 'off',
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  },
  
  prettier,
  
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      'jest.config.js',
      '**/example/**'
    ]
  }
];
