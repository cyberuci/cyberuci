<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';
	import { clsx } from 'clsx';
	interface Props {
		portableText: BlockComponentProps;
		children?: Snippet;
	}

	let { portableText, children }: Props = $props();
	const el = $derived(portableText.value.style);
</script>

<svelte:element
	this={el}
	class={clsx(
		el === 'h2' && 'type-heading-2 mt-18 mb-8',
		el === 'h3' && 'type-heading-1 mt-12 mb-6'
	)}>{@render children?.()}</svelte:element
>
