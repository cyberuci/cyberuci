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
		margin: 0 auto;
		padding: 0 16px;
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: 600px) {
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
		@media (min-width: 900px) {
			grid-column: 2 / span 3;
		}
		margin: 96px 0 8px 0;
		font-family: 'Inter';
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

	.grid {
		margin: 24px 0;
		grid-row: 3;
		grid-column: 1;
		@media (min-width: 900px) {
			grid-column: 2 / span 3;
		}
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
