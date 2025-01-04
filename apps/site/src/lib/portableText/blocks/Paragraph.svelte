<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<p class="type-body-2 max-w-prose">{@render children?.()}</p>
