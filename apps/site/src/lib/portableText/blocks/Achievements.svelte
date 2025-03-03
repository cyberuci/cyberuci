<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps;
	}

	type Years = {
		year: number;
		achievements: {
			title: string;
			placing: string;
		}[];
	}[];

	let { portableText }: Props = $props();
	let years = $derived(portableText.value.years) as Years;
</script>

{#each years as year}
	<h2 class="mt-12 mb-6 type-heading-1">{year.year}</h2>
	<div class="grid grid-cols-[repeat(auto-fill,_minmax(320px,1fr))] gap-1 max-w-4xl">
		{#each year.achievements as { title, placing }}
			<div
				class="flex flex-col gap-3.5 px-3 py-6 rounded-sm background-2 text-4.5 font-500 font-explorer"
			>
				<span>{title}</span>
				<span>{placing}</span>
			</div>
		{/each}
	</div>
{/each}
