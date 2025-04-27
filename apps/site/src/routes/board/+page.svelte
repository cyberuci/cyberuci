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

<main class="my-60 space-x">
	{#each data.board as { year, members }}
		{@const expanded = year >= cutoffYear}
		<div>
			<Title title="Board {year - 2000}/{year - 2000 + 1}" size={expanded ? 'large' : 'small'} />

			<div>
				<div
					class={clsx(
						'grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2',
						expanded && 'gap-x-6 gap-y-18',
						!expanded && 'gap-x-6 gap-y-8'
					)}
				>
					{#each members as { person, titles }, i}
						<div>
							<BoardMember {person} {titles} {expanded} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</main>
