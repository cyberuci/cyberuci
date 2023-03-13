<script lang="ts">
	import type { PageData } from './$types';
	import BoardYear from './BoardYear.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Board — Cyber @ UCI</title>
</svelte:head>

{#each data.boards as board}
	<BoardYear year={board.year} boardMembers={board.members} />
{/each}
