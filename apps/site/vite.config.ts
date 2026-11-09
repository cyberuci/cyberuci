import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		UnoCSS(),
		enhancedImages(),
		sveltekit({
			adapter: adapter(),
			preprocess: vitePreprocess(),
			alias: {
				$lib: 'src/lib'
			}
		})
	]
});
