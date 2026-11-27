<script lang="ts">
	import Title from '#lib/common/components/Title.svelte';
	import { Flag, Trophy } from 'lucide-svelte';
	import BitplanePuzzle from './BitplanePuzzle.svelte';

	const seasons = [2026, 2025];
</script>

<svelte:head>
	<title>Capture the Flag — Cyber @ UCI</title>
	<meta
		name="description"
		content="Cyber @ UCI's Capture the Flag team. Competitions, writeups, and security puzzles."
	/>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Capture the Flag" />
	<p class="mb-16 max-w-prose type-body-1 text-2">
		Our open CTF group plays online competitions, shares writeups, and walks newcomers through their
		first flags.
	</p>
	<section class="grid items-start gap-y-6 lg:grid-cols-16" aria-labelledby="challenge-title">
		<div class="lg:col-start-1 lg:col-end-5">
			<div class="flex items-center gap-2">
				<Flag size={18} aria-hidden="true" />
				<h2 id="challenge-title" class="m-0 type-label font-550">PUZZLE</h2>
			</div>
			<p class="type-body-1 text-2 lg:pr-8">Find the flag hidden in the image.</p>
		</div>
		<div class="min-w-0 lg:col-start-5 lg:col-end-17">
			<BitplanePuzzle />
		</div>
	</section>
	<section class="grid mt-24 items-start gap-y-6 lg:grid-cols-16" aria-labelledby="seasons-title">
		<div class="lg:col-start-1 lg:col-end-5">
			<div class="flex items-center gap-2">
				<Trophy size={18} aria-hidden="true" />
				<h2 id="seasons-title" class="m-0 type-label font-550">OUR SEASONS</h2>
			</div>
			<a
				href="https://ctftime.org/"
				class="mt-4 inline-block type-label text-blue-11 dark:text-bluedark-11">CTFtime ↗</a
			>
		</div>
		<div class="min-w-0 lg:col-start-5 lg:col-end-17">
			{#each seasons as year (year)}
				<section
					class="season grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4"
					aria-labelledby="season-{year}"
				>
					<div class="grid row-span-2 grid-rows-subgrid justify-items-center" aria-hidden="true">
						<div class="relative h-full flex items-center justify-center">
							<span class="absolute h-full w-px background-4"></span>
							<span class="relative size-2 rounded-full bg-blue-9"></span>
						</div>
						<span class="h-full w-px background-4"></span>
					</div>
					<h3 id="season-{year}" class="m-0 type-heading-1">{year}</h3>
					<div
						class="season-results grid grid-cols-1 gap-3 pb-10 pt-5 lg:grid-cols-4 sm:grid-cols-2"
					>
						{#each [0, 1, 2, 3] as slot (slot)}
							<div
								class="border border-gray-4 rounded-lg border-solid background-2 p-4 dark:border-graydark-4"
								aria-label="{year} competition result pending"
							>
								<p class="m-0 type-heading-1 text-blue-11 dark:text-bluedark-11">#…</p>
								<p class="mb-2 mt-3 type-label text-2">—</p>
								<p class="m-0 type-label text-2">— pts</p>
							</div>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</section>
</div>

<style>
	.season:last-child .season-results {
		@apply pb-0;
	}
</style>
