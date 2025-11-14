<script lang="ts">
	import type { PageProps } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import BoardMember from './BoardMember.svelte';
	import clsx from 'clsx';

	const { data }: PageProps = $props();

	const currentDate = new Date();
	const cutoffYear =
		currentDate.getMonth() <= 5 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	{#each data.board as { _id, year, sections } (_id)}
		{@const expanded = year >= cutoffYear}
		{@const sectionCount = sections.length}
		<div>
			<Title title="Board {year - 2000}/{year - 2000 + 1}" size={expanded ? 'large' : 'small'} />

			{#each sections as { _key, label, members } (_key)}
				{#if sectionCount > 1}
					<h2 class="my-3 type-label font-normal uppercase">{label}</h2>
				{/if}
				<div
					class={clsx(
						'grid grid-cols-1 mb-20 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2',
						expanded && 'gap-x-6 gap-y-16',
						!expanded && 'gap-x-6 gap-y-9'
					)}
				>
					{#each members as { person, titles } (person._id)}
						<div>
							<BoardMember {person} {titles} {expanded} />
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</main>
