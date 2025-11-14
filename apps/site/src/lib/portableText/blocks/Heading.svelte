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
		el === 'h2' && 'mb-8 mt-18 type-heading-2',
		el === 'h3' && 'mb-6 mt-12 type-heading-1'
	)}>{@render children?.()}</svelte:element
>
