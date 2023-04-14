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
			<BoardYear year={board.year} sections={board.sections} />
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		margin: 0 auto;
		padding: 0 16px;
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: 600px) {
			grid-template-columns: repeat(3, 1fr);
			max-width: 600px - 32px;
		}
		@media (min-width: 900px) {
			grid-template-columns: repeat(5, 1fr);
			padding: 0 32px;
			max-width: 1200px;
		}
		gap: 0 24px;
	}

	h1 {
		grid-row: 1;
		grid-column: 1;
		@media (min-width: 600px) {
			grid-column: 1 / span 3;
		}
		@media (min-width: 900px) {
			grid-column: 2 / span 3;
		}
		font-family: 'Inter';
		margin: 96px 0 8px 0;
		font-size: 40px;
		letter-spacing: -0.022em;
		line-height: 56px;
		font-weight: 400;
	}

	.line {
		margin: 0 -25%;
		grid-row: 2;
		grid-column: 1 / -1;
		width: 150%;
		height: 1px;
		background-color: var(--gray7);
	}

	.boards {
		grid-row: 3;
		grid-column: 1;
		@media (min-width: 600px) {
			grid-column: 1 / span 3;
		}
		@media (min-width: 900px) {
			grid-column: 2 / span 3;
		}
	}
</style>
