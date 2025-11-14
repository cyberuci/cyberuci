<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import { ExternalLink } from 'lucide-svelte';

	interface Props {
		portableText: CustomBlockComponentProps<{ label: string; url: string }>;
	}

	let { portableText }: Props = $props();

	let link = $derived(portableText.value);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a href={link.url}>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
	<span>{link.label}</span>
	<ExternalLink size={20} strokeWidth={2} />
</a>

<style lang="scss">
	a {
		text-decoration: none;
		display: block;
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
