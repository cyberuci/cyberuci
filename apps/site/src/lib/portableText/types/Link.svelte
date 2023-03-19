<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import { Download } from 'lucide-svelte';

	export let portableText: CustomBlockComponentProps<{ label: string; url: string }>;

	$: link = portableText.value;
</script>

<div>
	<span>{link.label}</span>
	<Download size={20} strokeWidth={2} />
</div>

<style lang="scss">
	div {
		margin: 32px auto;
		background-color: var(--gray3);
		padding: 1rem;
		border-radius: 4px;
		color: var(--gray12);
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:hover {
			background-color: var(--gray4);
		}
	}
</style>
