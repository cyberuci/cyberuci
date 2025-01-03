<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps<{ label: string; fileUrl: string }>;
	}

	let { portableText }: Props = $props();

	let file = $derived(portableText.value);
</script>

<div>
	<span>{file.label}</span>
	<object type="application/pdf" title={file.label} data={file.fileUrl}></object>
</div>

<style lang="scss">
	div {
		margin: 32px auto;
		background-color: var(--gray3);
		border-radius: 4px;
		overflow: hidden;
	}

	span {
		display: block;
		padding: 1rem;
	}

	object {
		width: 100%;
		aspect-ratio: 3/2;
	}
</style>
