import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*'],
        },
      ],
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.css'],
    rules: {
      'at-rule-no-unknown': [
        'error',
        {
          ignoreAtRules: [
            'theme',
            'tailwind',
            'apply',
            'variants',
            'responsive',
            'screen',
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
