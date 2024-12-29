<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<strong>
	{@render children?.()}
</strong>

<style lang="scss">
	strong {
		font-weight: 600;
	}
</style>
