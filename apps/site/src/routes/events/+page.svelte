<script lang="ts">
	import '../../app.css';

	import Title from '$lib/common/components/Title.svelte';
	import Event from './Event.svelte';
	import { CalendarColors } from './CalendarColors';
	import { type GoogleCalendarEvent } from './+page.server';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	import '@schedule-x/theme-default/dist/index.css';
	import { ScheduleXCalendar } from '@schedule-x/svelte';
	import { createCalendar, createViewMonthGrid, type CalendarApp } from '@schedule-x/calendar';
	import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';

	import { Temporal } from 'temporal-polyfill';
	import 'temporal-polyfill/global';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

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
		let prevEventClicked: HTMLElement | null = null;

		async function loadAllCalendars() {
			for (const [calendar_name, calendar_data] of Object.entries(data.events)) {
				calendarEvents.push(
					...calendar_data.map((event: GoogleCalendarEvent, i: number) => {
						const startStr = event.start.dateTime || `${event.start.date}T00:00:00Z`;
						const endStr = event.end.dateTime || `${event.end.date}T23:59:59Z`;

						return {
							id: event.id || `${i}`,
							title: event.summary,
							start: Temporal.ZonedDateTime.from(`${startStr}[America/Los_Angeles]`),
							end: Temporal.ZonedDateTime.from(`${endStr}[America/Los_Angeles]`),
							calendarId: calendar_name,
							location: event.location || ''
						};
					})
				);
			}
		}

		loadAllCalendars();

		calendarEvents.sort((a, b) => Temporal.Instant.compare(a.start.toInstant(), b.end.toInstant()));

		calendarApp = createCalendar(
			{
				views: [createViewMonthGrid()],
				calendars: CalendarColors,
				events: calendarEvents,
				callbacks: {
					onEventClick(event) {
						const eventId = event.id + '_side_view';
						const eventSide = document.getElementById(eventId);
						const eventDetails = document.getElementById('eventDetails');

						if (eventSide != null && eventDetails != null) {
							const targetPosition = eventSide.offsetTop - eventDetails.offsetTop;

							prevEventClicked?.classList.remove('bg-#212121');
							prevEventClicked?.classList.add('bg-#3D3D3D');

							eventSide.classList.remove('bg-#3D3D3D');
							eventSide.classList.add('bg-#212121');

							prevEventClicked = eventSide;

							eventDetails.scrollTo({
								top: targetPosition,
								behavior: 'smooth'
							});
						}
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

	<div class="flex flex-col flex-wrap lg:flex-row">
		<div class="w-20/20 lg:w-13/20">
			<div class="w-full">
				{#if calendarApp}
					<ScheduleXCalendar id="calendar" {calendarApp} />
				{/if}
			</div>
		</div>

		<div id="eventDetails" class="h-75vh w-20/20 overflow-scroll pl-40px lg:w-7/20">
			<p class="text-1.1rem type-label">Upcoming Events</p>
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
