<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';

	import { onMount } from 'svelte';
	import { ScheduleXCalendar } from '@schedule-x/svelte';
	import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';
	import 'temporal-polyfill/global';
	import { Temporal } from 'temporal-polyfill';

	let calendarApp;

	onMount(() => {
		calendarApp = createCalendar({
			views: [createViewMonthGrid()],
			events: [
				{
					id: '1',
					title: 'Event 1',
					start: Temporal.PlainDate.from('2026-04-06'),
					end: Temporal.PlainDate.from('2026-04-06')
				},
				{
					id: '2',
					title: 'Event 2',
					start: Temporal.ZonedDateTime.from('2026-04-06T02:00:00+09:00[Asia/Tokyo]'),
					end: Temporal.ZonedDateTime.from('2026-04-06T04:00:00+09:00[Asia/Tokyo]')
				}
			]
		});
	});
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Events" />

	<div class="calendar-wrapper">
		{#if calendarApp}
			<ScheduleXCalendar {calendarApp} />
		{/if}
	</div>
</main>

<style>
	.calendar-wrapper {
		width: 100%;
	}
	:global(.sx-svelte-calendar-wrapper) {
		height: 100vh;
	}
	:global(.sx__calendar) {
		@apply type-label; /* This works if using UnoCSS/Tailwind */
	}
</style>
