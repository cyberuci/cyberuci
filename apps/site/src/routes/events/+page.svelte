<script lang="ts">
	import type { PageData } from './$types';
	import Event from './Event.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

<main>
	<h1>Events</h1>
	<div class="line" />
	<div class="grid">
		<div class="events">
			{#each data.events as event}
				<Event {event} />
			{/each}
		</div>
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
		margin: 96px 0 8px 0;
		font-family: 'Inter';
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

	.grid {
		margin: 24px 0;
		grid-column: 2 / span 3;
		grid-row: 3;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.events {
		grid-column: 2 / span 4;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
