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
	{#each data.boards as board}
		<BoardYear year={board.year} sections={board.sections} />
	{/each}
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
</style>
