<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import AchievementCard from './AchievementCard.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let activeCategory = $state<string | null>(null);

	const allAchievements = $derived(data.achievementsPage.achievements ?? []);

	const categories = $derived(
		allAchievements
			.map((a) => a.category)
			.filter((c): c is NonNullable<typeof c> => c != null)
			.filter((c, i, arr) => arr.findIndex((x) => x.name === c.name) === i)
	);

	const filtered = $derived(
		activeCategory === null
			? allAchievements
			: allAchievements.filter((a) => a.category?.name === activeCategory)
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
	<title>Timeline — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Timeline" />

	<div class="mb-8 w-full type-body-1 text-gray-11 md:w-3/4 dark:text-graydark-11">
		<PortableText value={data.achievementsPage.description} />
	</div>

	<div class="mb-12 flex flex-wrap gap-2">
		<button
			onclick={() => (activeCategory = null)}
			class="cursor-pointer border rounded-full border-solid px-2.5 py-0.5 type-label transition-colors {activeCategory ===
			null
				? 'border-blue-7 bg-blue-3 text-blue-11 dark:border-bluedark-7 dark:bg-bluedark-3 dark:text-bluedark-11'
				: 'border-gray-4 bg-transparent text-gray-11 dark:border-graydark-4 hover:border-gray-5 hover:background-3 dark:text-graydark-11 dark:hover:border-graydark-5'}"
		>
			All
		</button>
		{#each categories as category (category.name)}
			<button
				onclick={() => (activeCategory = activeCategory === category.name ? null : category.name)}
				class="cursor-pointer border rounded-full border-solid px-2.5 py-0.5 type-label transition-colors {activeCategory ===
				category.name
					? 'border-blue-7 bg-blue-3 text-blue-11 dark:border-bluedark-7 dark:bg-bluedark-3 dark:text-bluedark-11'
					: 'border-gray-4 bg-transparent text-gray-11 dark:border-graydark-4 hover:border-gray-5 hover:background-3 dark:text-graydark-11 dark:hover:border-graydark-5'}"
			>
				{category.name}
			</button>
		{/each}
	</div>

	<div class="timeline relative">
		<div class="timeline-spine absolute bottom-0 top-0 w-px bg-gray-4 dark:bg-graydark-4"></div>

		<svg
			class="timeline-arrow absolute top-0 text-gray-4 -translate-y-full dark:text-graydark-4"
			width="8"
			height="6"
			viewBox="0 0 8 6"
		>
			<polygon points="4,0 8,6 0,6" fill="currentColor" />
		</svg>

		<svg
			class="timeline-arrow absolute bottom-0 translate-y-full text-gray-4 dark:text-graydark-4"
			width="8"
			height="6"
			viewBox="0 0 8 6"
		>
			<polygon points="0,0 8,0 4,6" fill="currentColor" />
		</svg>

		{#each achievementsByYear as { year, items } (year)}
			<div class="timeline-group relative z-10 mb-12">
				<div class="timeline-year pb-2">
					<p class="type-display select-none text-gray-6 leading-none dark:text-graydark-8">
						{year}
					</p>
				</div>
				<div class="timeline-year-spacer"></div>

				{#each items as a, i (a._key)}
					{#if i % 2 === 0}
						<!-- RIGHT card -->
						<div class="timeline-spacer-left" style="grid-row: {i + 2};"></div>
						<div class="timeline-card timeline-card-right" style="grid-row: {i + 2};">
							<div class="timeline-connector h-px shrink-0 bg-gray-4 dark:bg-graydark-4"></div>
							<div class="timeline-card-body">
								<AchievementCard
									title={a.title ?? ''}
									description={a.description ?? ''}
									placing={a.placing}
									category={a.category}
									image={a.image}
								/>
							</div>
						</div>
					{:else}
						<!-- LEFT card -->
						<div class="timeline-card timeline-card-left" style="grid-row: {i + 2};">
							<div class="timeline-card-body">
								<AchievementCard
									title={a.title ?? ''}
									description={a.description ?? ''}
									placing={a.placing}
									category={a.category}
									image={a.image}
								/>
							</div>
							<div class="timeline-connector h-px shrink-0 bg-gray-4 dark:bg-graydark-4"></div>
						</div>
						<div class="timeline-spacer-right" style="grid-row: {i + 2};"></div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.timeline-spine {
		left: 50%;
		transform: translateX(-50%);
	}

	.timeline-arrow {
		left: 50%;
		transform: translateX(-50%);
	}

	.timeline-arrow.top-0 {
		transform: translateX(-50%) translateY(-100%);
	}

	.timeline-arrow.bottom-0 {
		transform: translateX(-50%) translateY(100%);
	}

	.timeline-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 1rem;
	}

	.timeline-year {
		grid-column: 1;
		grid-row: 1;
	}

	.timeline-year-spacer {
		grid-column: 2;
		grid-row: 1;
	}

	.timeline-spacer-left {
		grid-column: 1;
	}

	.timeline-spacer-right {
		grid-column: 2;
	}

	.timeline-card {
		display: flex;
		align-items: center;
	}

	.timeline-card-right {
		grid-column: 2;
	}

	.timeline-card-left {
		grid-column: 1;
		justify-content: flex-end;
	}

	.timeline-connector {
		width: 2rem;
	}

	.timeline-card-left .timeline-card-body {
		padding-right: 0.75rem;
	}

	.timeline-card-right .timeline-card-body {
		padding-left: 0.75rem;
	}

	@media (max-width: 767px) {
		.timeline-spine {
			left: 0.75rem;
		}

		.timeline-arrow {
			left: 0.75rem;
		}

		.timeline-group {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.timeline-year {
			padding-left: 2rem;
		}

		.timeline-year-spacer,
		.timeline-spacer-left,
		.timeline-spacer-right {
			display: none;
		}

		.timeline-card {
			justify-content: flex-start;
			padding-left: 0.75rem;
		}

		/* Flip left cards so connector is on the left (toward the spine) */
		.timeline-card-left {
			flex-direction: row-reverse;
			justify-content: flex-end;
		}

		.timeline-card-left .timeline-card-body {
			padding-right: 0;
			padding-left: 0.75rem;
			flex: 1;
			min-width: 0;
		}

		.timeline-card-right .timeline-card-body {
			flex: 1;
			min-width: 0;
		}

		.timeline-connector {
			width: 1.25rem;
		}
	}
</style>
