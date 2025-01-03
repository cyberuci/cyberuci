<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import BoardMember from './BoardMember.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let year = $derived(data.board.year % 100);
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<div class="mx-10 my-60">
	<Title title="Board {year}/{year + 1}" />
	<main>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-18">
			{#each data.board.members as { person, titles }, i}
				<div style:animation-delay="{100 * i}ms">
					<BoardMember {person} {titles} />
				</div>
			{/each}
		</div>
	</main>
</div>
