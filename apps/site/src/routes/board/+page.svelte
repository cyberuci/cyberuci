<script lang="ts">
	import type { PageData } from './$types';
	import BoardYear from './BoardYear.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<main>
	<h1>Board</h1>
	<div class="line" />
	<div class="boards">
		{#each data.boards as board}
			<BoardYear year={board.year} boardMembers={board.members} />
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0 24px;
	}

	h1 {
		grid-column: 2 / span 3;
		grid-row: 1;
		font-family: 'Inter';
		margin: 96px 0 8px 0;
		font-size: 40px;
		letter-spacing: -0.022em;
		line-height: 56px;
		font-weight: 400;
	}

	.line {
		grid-column: 1 / span 5;
		grid-row: 2;
		width: 100%;
		height: 1px;
		background-color: var(--gray7);
	}

	.boards {
		grid-column: 2 / span 3;
		grid-row: 3;
	}
</style>
