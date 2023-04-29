<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title/Title.svelte';
	import Board from './Board.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<Title title="Board 23" />
<main>
	<Board sections={data.board.sections} />
</main>

<style lang="scss">
	@use '$lib/common/styles/styles' as styles;

	main {
		max-width: styles.$max-width;
		margin: 72px auto;
		padding: 0 styles.$padding-x;
	}

	.section {
		margin-bottom: 96px;
	}
</style>
