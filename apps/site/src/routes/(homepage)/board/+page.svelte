<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import Board from './Board.svelte';

	export let data: PageData;
	$: year = data.board.year % 100;
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<div class="mx-10">
	<div class="mb-22">
		<Title title="Board {year}/{year + 1}" />
	</div>
	<main>
		<Board members={data.board.members} />
	</main>
</div>
