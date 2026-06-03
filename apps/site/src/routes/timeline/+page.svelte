<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import AchievementCard from './AchievementCard.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let activeCategory = $state('All');

	const allAchievements = $derived(data.achievementsPage.achievements ?? []);

	const categories = $derived([
		'All',
		...new Set(allAchievements.map((a) => a.category).filter(Boolean))
	]);

	const filtered = $derived(
		activeCategory === 'All'
			? allAchievements
			: allAchievements.filter((a) => a.category === activeCategory)
	);

	const years = $derived(
		[...new Set(filtered.map((a) => a.year))].sort((a, b) => (b ?? 0) - (a ?? 0))
	);

	const achievementsByYear = $derived(
		years.map((year) => ({
			year,
			items: filtered.filter((a) => a.year === year)
		}))
	);
</script>

<svelte:head>
	<title>Achievements — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Achievements" />

	<div class="mb-8 w-3/4 type-body-1 text-gray-11 dark:text-graydark-11">
		<PortableText value={data.achievementsPage.description} />
	</div>

	<div class="mb-12 flex flex-wrap gap-2">
		{#each categories as category (category)}
			<button
				onclick={() => (activeCategory = activeCategory === category ? 'All' : category)}
				class="cursor-pointer border rounded-full border-solid px-2.5 py-0.5 type-label transition-colors {activeCategory ===
				category
					? 'border-blue-7 bg-blue-3 text-blue-11 dark:border-bluedark-7 dark:bg-bluedark-3 dark:text-bluedark-11'
					: 'border-gray-4 bg-transparent text-gray-11 dark:border-graydark-4 hover:border-gray-5 hover:background-3 dark:text-graydark-11 dark:hover:border-graydark-5'}"
			>
				{category}
			</button>
		{/each}
	</div>

	<div class="relative">
		<div
			class="absolute bottom-0 left-1/2 top-0 w-px bg-gray-4 -translate-x-1/2 dark:bg-graydark-4"
		></div>

		<!-- Top arrowhead (pointing up) -->
		<svg
			class="absolute left-1/2 top-0 text-gray-4 -translate-x-1/2 -translate-y-full dark:text-graydark-4"
			width="8"
			height="6"
			viewBox="0 0 8 6"
		>
			<polygon points="4,0 8,6 0,6" fill="currentColor" />
		</svg>

		<!-- Bottom arrowhead (pointing down) -->
		<svg
			class="absolute bottom-0 left-1/2 translate-y-full text-gray-4 -translate-x-1/2 dark:text-graydark-4"
			width="8"
			height="6"
			viewBox="0 0 8 6"
		>
			<polygon points="0,0 8,0 4,6" fill="currentColor" />
		</svg>

		{#each achievementsByYear as { year, items } (year)}
			<div class="relative z-10 grid mb-12" style="grid-template-columns: 1fr 1fr; row-gap: 1rem;">
				<div style="grid-column: 1; grid-row: 1;" class="pb-2">
					<p class="type-display select-none text-gray-6 leading-none dark:text-graydark-8">
						{year}
					</p>
				</div>
				<div style="grid-column: 2; grid-row: 1;"></div>

				<!-- Achievement rows, alternating sides -->
				{#each items as a, i (a._key)}
					{#if i % 2 === 0}
						<div style="grid-column: 1; grid-row: {i + 2};"></div>
						<div style="grid-column: 2; grid-row: {i + 2};" class="flex items-center">
							<div class="h-px w-8 shrink-0 bg-gray-4 dark:bg-graydark-4"></div>
							<div class="pl-3">
								<AchievementCard
									title={a.title ?? ''}
									description={a.description ?? ''}
									placing={a.placing}
								/>
							</div>
						</div>
					{:else}
						<!-- Odd: card on LEFT -->
						<div style="grid-column: 1; grid-row: {i + 2};" class="flex items-center justify-end">
							<div class="pr-3">
								<AchievementCard
									title={a.title ?? ''}
									description={a.description ?? ''}
									placing={a.placing}
								/>
							</div>
							<div class="h-px w-8 shrink-0 bg-gray-4 dark:bg-graydark-4"></div>
						</div>
						<div style="grid-column: 2; grid-row: {i + 2};"></div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>
