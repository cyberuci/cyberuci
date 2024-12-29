<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<p>{@render children?.()}</p>

<style lang="scss">
	p {
		margin: 0;
		font-family: Inter, sans-serif;
		font-size: 16px;
		letter-spacing: -0.011em;
		line-height: 27px;
	}
</style>
