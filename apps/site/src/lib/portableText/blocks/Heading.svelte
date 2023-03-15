<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import Block from '../Block.svelte';

	export let portableText: BlockComponentProps;

	$: ({ value } = portableText);
	$: ({ style } = value);
</script>

<Block>
	<svelte:element this={style}><slot /></svelte:element>
</Block>

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
