<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import Block from '../Block.svelte';

	export let portableText: CustomBlockComponentProps<{ label: string; url: string }>;

	$: link = portableText.value;
</script>

<div>
	<Block multiplier={1.3}>
		{link.label}
	</Block>
</div>

<style lang="scss">
	div {
		margin: 32px auto;
	}
</style>
