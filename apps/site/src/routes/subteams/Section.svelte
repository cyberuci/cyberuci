<script lang="ts">
	import type { ComponentType } from 'svelte';
	import {
		MonitorCloud,
		Palette,
		Heart,
		Globe,
		Users,
		Search,
		Flag,
		Shield,
		SquareTerminal
	} from 'lucide-svelte';
	import type { Icon } from 'lucide-svelte';

	interface Props {
		name: string;
		description: string | null;
		href?: string;
	}

	let { name, description, href }: Props = $props();

	const symbols: Record<string, ComponentType<Icon>> = {
		Infrastructure: MonitorCloud,
		Graphics: Palette,
		'Social Media': Heart,
		Web: Globe,
		Outreach: Users,
		Research: Search,
		CTF: Flag,
		CCDC: Shield,
		CPTC: SquareTerminal
	};
</script>

<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
	<svelte:component this={symbols[name]} size={18} />

	{#if href}
		<div class="block">
			<a
				class="m-0 type-heading-2 text-inherit no-underline hover:underline hover:decoration-dashed"
				{href}>{name}</a
			>
		</div>
	{:else}
		<h2 class="m-0 type-heading-2">{name}</h2>
	{/if}
</div>
{#if href}
	<p class="my-2 type-label">
		[Learn more: <a
			class="m-0 text-inherit no-underline hover:underline hover:decoration-dashed"
			{href}>{href}</a
		>]
	</p>
{/if}

{#if description}
	<p class="mb-8 max-w-prose type-body-2 text-gray-11 dark:text-graydark-11">{description}</p>
{/if}
