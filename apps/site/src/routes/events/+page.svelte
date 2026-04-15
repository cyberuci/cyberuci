<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { ScheduleXCalendar } from '@schedule-x/svelte';
	import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';

	import { Temporal } from 'temporal-polyfill';
	import 'temporal-polyfill/global';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let calendarApp = $state();

	// let currentTime = Temporal.Now.zonedDateTimeISO();

	let calendarEvents = $state([]);

	onMount(() => {
		calendarEvents = data.events.map((event, i) => {
			const startStr = event.start.dateTime || `${event.start.date}T00:00:00Z`;
			const endStr = event.end.dateTime || `${event.end.date}T23:59:59Z`;

			return {
				id: event.id || `${i}`,
				title: event.summary,
				start: Temporal.ZonedDateTime.from(`${startStr}[America/Los_Angeles]`),
				end: Temporal.ZonedDateTime.from(`${endStr}[America/Los_Angeles]`),
				calendarId: 'personal'
			};
		});

		console.log(calendarEvents);

		calendarApp = createCalendar({
			views: [createViewMonthGrid()],
			calendars: {
				work: {
					colorName: 'work',
					lightColors: {
						main: '#1a73e8',
						container: '#d2e3fc',
						onContainer: '#000000'
					}
				},
				personal: {
					colorName: 'personal',
					lightColors: {
						main: '#00796b',
						container: '#b9f6ca',
						onContainer: '#000000'
					}
				}
			},
			events: calendarEvents,
			callbacks: {
				onEventClick(event) {
					console.log('Event clicked:', event);
					if (event.url) window.open(event.url, '_blank');
				}
			},
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
		});
	});
	let options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	let timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric'
	};
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Events" />

	<div style="display: flex; flex-direction: row;">
		<div style="width: 65%">
			<div class="calendar-wrapper">
				{#if calendarApp}
					<ScheduleXCalendar {calendarApp} />
				{/if}
			</div>
		</div>

		<div style="width: 35%; padding-left: 40px;">
			<p class="type-label" style="font-size: 20px">Upcoming Events</p>

			{#each calendarEvents as event (event.id)}
				<div
					style="width: 100%; background-color: #3D3D3D; border-radius: 10px; padding: 1px; padding-left: 17px; padding-right: 17px; margin-bottom: 10px"
				>
					<!-- <p>{Temporal.PlainDateTime.compare(currentTime, event.start)}</p> -->
					<p class="type-label">
						{new Intl.DateTimeFormat(undefined, timeOptions).format(event.start.toPlainTime())}
						{new Intl.DateTimeFormat('en-US', options).format(
							new Date(event.start.toLocaleString())
						)}: {event.title}
					</p>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	.calendar-wrapper {
		width: 100%;
	}

	:global(.sx-svelte-calendar-wrapper) {
		height: 100vh;

		--sx-color-background: #151515;
		--sx-internal-color-text: #fff;

		--sx-border: 1px solid #3d3d3d;

		--sx-color-primary: #888888;

		--sx-color-on-primary-container: #21005e;
		--sx-color-surface-tint: #bdbdbd;
		--sx-color-on-background: #fff;
	}

	:global(.sx__button:hover) {
		background-color: #3d3d3d !important;
	}

	:global(.sx__date-picker__month-view-header__month-year) {
		font-size: 1rem !important;
	}

	:global(.sx__calendar .sx__date-picker__day-names) {
		font-size: 0.7rem !important;
	}

	:global(.sx__calendar .sx__date-picker__week) {
		font-size: 0.4rem !important;
	}

	:global(.sx__date-picker-popup) {
		max-width: 300px !important;
		max-height: 350px !important;
	}

	:global(.sx__calendar) {
		@apply type-label; /* This works if using UnoCSS/Tailwind */
	}

	/* Optional: Add a browser tooltip for the full name */
	:global(.sx__event) {
		cursor: pointer;
	}
</style>
