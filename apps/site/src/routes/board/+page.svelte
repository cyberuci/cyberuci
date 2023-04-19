<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import BoardYear from './BoardYear.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<Title>Board</Title>
<main>
	<div class="boards">
		{#each data.boards as board}
			<BoardYear year={board.year} sections={board.sections} />
		{/each}
	</div>
</main>

<style lang="scss">
	@use '$lib/common/styles/styles' as styles;

	main {
		max-width: 100ch;
		margin: 72px auto;
		padding: 0 styles.$padding-x;
	}

	.section {
		margin-bottom: 96px;
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
