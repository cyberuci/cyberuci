import { presetUno } from 'unocss';
import { defineConfig } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	presets: [presetUno()],
	extractors: [extractorSvelte()],
	shortcuts: {
		'type-display':
			"font-strobo [font-feature-settings:'dlig'] font-stretch-[175%] font-size-5xl font-normal my-8",
		'type-label': 'font-mono font-size-sm',
		'type-heading-1': 'font-explorer font-medium font-size-2xl',
		'type-heading-2': 'font-explorer font-medium font-size-4xl',
		'type-body-1': 'font-sans font-size-sm line-height-snug',
		'type-body-2': 'font-sans font-size-4 line-height-snug'
	},
	theme: {
		fontFamily: {
			mono: 'CommitMono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			sans: 'Blinker, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
			strobo: '"BBB Strobo", sans-serif',
			explorer: 'TASAExplorer, sans-serif'
		}
	}
});
