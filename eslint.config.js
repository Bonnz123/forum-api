import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

export default defineConfig([
  daStyle,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, vitest },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...vitest.environments.env.globals, ...globals.node },
    },
    rules: {
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },
]);
