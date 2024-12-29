<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<ul>
	{@render children?.()}
</ul>

<style lang="scss">
	ul {
		padding: 0 0 0 1.5rem;
		font-family: Inter, sans-serif;
		font-size: 16px;
		letter-spacing: -0.011em;
		line-height: 27px;
	}
</style>
