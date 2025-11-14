<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface Props {
		portableText: CustomBlockComponentProps;
	}

	type Years = {
		_key: string;
		year: number;
		achievements: {
			_key: string;
			title: string;
			placing: string;
		}[];
	}[];

	let { portableText }: Props = $props();
	let years = $derived(portableText.value.years) as Years;
</script>

{#each years as year (year._key)}
	<h2 class="mb-6 mt-12 type-heading-1">{year.year}</h2>
	<div class="grid grid-cols-[repeat(auto-fill,_minmax(320px,1fr))] max-w-4xl gap-1">
		{#each year.achievements as achievement (achievement._key)}
			<div
				class="flex flex-col gap-3.5 rounded-sm background-2 px-3 py-6 text-4.5 font-500 font-explorer"
			>
				<span>{achievement.title}</span>
				<span>{achievement.placing}</span>
			</div>
		{/each}
	</div>
{/each}
