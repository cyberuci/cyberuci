import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import eslintPluginImportX from 'eslint-plugin-import-x';
import { fileURLToPath } from 'node:url';
import unocss from '@unocss/eslint-config/flat';
import ts from 'typescript-eslint';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['pnpm-lock.yaml'] },
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	unocss,
	eslintPluginImportX.flatConfigs.typescript,
	{
		settings: {
			'import-x/order': [
				'error',
				{
					groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '$app/**',
							group: 'external',
							position: 'before'
						},
						{
							pattern: '$env/**',
							group: 'external',
							position: 'before'
						},
						{
							pattern: '$lib/**',
							group: 'internal'
						}
					],
					distinctGroup: true,
					pathGroupsExcludedImportTypes: ['type']
				}
			]
		}
	}
);
