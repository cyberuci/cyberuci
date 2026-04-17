<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import Event from './Event.svelte';
	import '../../app.css';

	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { ScheduleXCalendar } from '@schedule-x/svelte';
	import { createCalendar, createViewMonthGrid, type CalendarApp } from '@schedule-x/calendar';
	import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';

	import '@schedule-x/theme-default/dist/index.css';

	import { Temporal } from 'temporal-polyfill';
	import 'temporal-polyfill/global';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	interface GoogleCalendarData {
		id: string;
		summary: string;
		location: string;
		start: {
			dateTime: string;
			date: string;
		};
		end: {
			dateTime: string;
			date: string;
		};
	}

	interface CalendarEvent {
		id: string;
		title: string;
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
		calendarId: string;
		location: string;
	}

	let calendarApp = $state<CalendarApp>();
	let calendarEvents = $state<CalendarEvent[]>([]);

	const calendarControls = createCalendarControlsPlugin();

	onMount(() => {
		calendarEvents = data.events.map((event: GoogleCalendarData, i: number) => {
			const startStr = event.start.dateTime || `${event.start.date}T00:00:00Z`;
			const endStr = event.end.dateTime || `${event.end.date}T23:59:59Z`;

			return {
				id: event.id || `${i}`,
				title: event.summary,
				start: Temporal.ZonedDateTime.from(`${startStr}[America/Los_Angeles]`),
				end: Temporal.ZonedDateTime.from(`${endStr}[America/Los_Angeles]`),
				calendarId: 'personal',
				location: event.location || ''
			};
		});

		calendarApp = createCalendar(
			{
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
						const eventId = event.id + '_side_view';
						const eventSide = document.getElementById(eventId);

						if (eventSide != null) eventSide.scrollIntoView({ behavior: 'smooth' });
					}
				},
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
			},
			[calendarControls]
		);
	});
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Events" />

	<div class="flex flex-row">
		<div class="w-13/20">
			<div class="w-full">
				{#if calendarApp}
					<ScheduleXCalendar id="calendar" {calendarApp} />
				{/if}
			</div>
		</div>

		<div class="h-75vh w-7/20 overflow-scroll pl-40px">
			<p class="text-20px type-label">Upcoming Events</p>
			{#each calendarEvents as event (event.id)}
				<Event
					id={event.id}
					title={event.title}
					start={event.start}
					end={event.end}
					calendarId={event.calendarId}
					location={event.location}
				/>
			{/each}
		</div>
	</div>
</main>
