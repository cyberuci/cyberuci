<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		portableText: BlockComponentProps;
		children?: Snippet;
	}

	let { portableText, children }: Props = $props();

	let { value } = $derived(portableText);
	let { style } = $derived(value);
</script>

<svelte:element this={style}>{@render children?.()}</svelte:element>

<style lang="scss">
	* {
		font-family: Inter, sans-serif;
		font-weight: 600;
	}

	// Based on https://rsms.me/inter/dynmetrics/
	h2 {
		margin: 1.25rem 0;
		font-size: 20px;
		letter-spacing: -0.017em;
		line-height: 34px;
	}

	h3 {
		margin: 1.25rem 0;
		font-size: 18px;
		letter-spacing: -0.014em;
		line-height: 31px;
	}
</style>
