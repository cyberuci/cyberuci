<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title/Title.svelte';
	import Board from './Board.svelte';

	export let data: PageData;
	$: year = data.board.year % 100;
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

<Title title="Board {year}/{year + 1}" />
<main>
	<Board members={data.board.members} />
</main>

<style lang="scss">
	@use '$lib/common/styles/styles' as styles;

	main {
		max-width: styles.$max-width;
		margin: 72px auto;
		padding: 0 styles.$padding-x;
	}
</style>
