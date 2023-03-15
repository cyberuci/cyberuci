<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import Block from '../Block.svelte';

	export let portableText: CustomBlockComponentProps<{ label: string; fileUrl: string }>;

	$: file = portableText.value;
</script>

<div>
	<Block multiplier={1.3}>
		{file.label}
		<object type="application/pdf" title={file.label} data={file.fileUrl} />
	</Block>
</div>

<style lang="scss">
	div {
		margin: 32px auto;
	}

	object {
		width: 100%;
		aspect-ratio: 3/2;
	}
</style>
