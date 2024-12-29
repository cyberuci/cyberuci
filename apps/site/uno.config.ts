import { presetUno } from 'unocss';
import { defineConfig } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
import transformerDirectives from '@unocss/transformer-directives';
import { gray, grayDark } from '@radix-ui/colors';

export default defineConfig({
	presets: [presetUno({ dark: 'media' })],
	extractors: [extractorSvelte()],
	transformers: [transformerDirectives()],
	shortcuts: {
		// Typograhy
		'type-display':
			"font-strobo [font-feature-settings:'dlig'] font-stretch-[175%] text-5xl font-normal my-8",
		'type-label': 'font-mono text-sm',
		'type-heading-1': 'font-explorer font-medium text-2xl',
		'type-heading-2': 'font-explorer font-medium text-4xl',
		'type-body-1': 'font-sans text-sm line-height-snug',
		'type-body-2': 'font-sans text-base line-height-snug',

		// Colors
		background: 'bg-gray-1 dark:bg-graydark-1',
		'background-2': 'bg-gray-2 dark:bg-graydark-2',
		text: 'text-gray-12 dark:text-graydark-12'
	},
	extendTheme: (theme) => ({
		...theme,
		fontFamily: {
			mono: 'CommitMono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			sans: 'Blinker, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
			strobo: '"BBB Strobo", sans-serif',
			explorer: 'TASAExplorer, sans-serif'
		},
		colors: {
			gray: Object.fromEntries(Object.values(gray).map((color, i) => [i + 1, color])),
			graydark: Object.fromEntries(Object.values(grayDark).map((color, i) => [i + 1, color])),

			// cyber accent color
			// https://www.radix-ui.com/colors/custom
			// accent: #2975BA, background: #FBFDFE
			blue: {
				1: '#f7fbff',
				2: '#f0f6fe',
				3: '#e1f1ff',
				4: '#d2eaff',
				5: '#c0dfff',
				6: '#acd2fa',
				7: '#91c1f2',
				8: '#68a9ea',
				9: '#2975ba',
				10: '#1767ab',
				11: '#1b6aae',
				12: '#1b3d5d'
			},
			// accent: #2975BA, background: #081826
			bluedark: {
				1: '#0e1822',
				2: '#101b27',
				3: '#0b2945',
				4: '#00345e',
				5: '#054171',
				6: '#144f83',
				7: '#20609a',
				8: '#2773b8',
				9: '#2975ba',
				10: '#2968a2',
				11: '#75bbff',
				12: '#cae6ff'
			}
		}
	})
});
