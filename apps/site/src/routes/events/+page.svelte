<script lang="ts">
	import '../../app.css';
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { type CalendarApp } from '@schedule-x/calendar';
	import type { PageData } from './$types';

	import { loadAllCalendars } from '$lib/common/components/Calendar/transform';
	import { createApp } from '$lib/common/components/Calendar/calendarApp';

	import Title from '$lib/common/components/Title.svelte';
	import Event from './Event.svelte';

	import { onMount } from 'svelte';

	import '@schedule-x/theme-default/dist/index.css';
	import { ScheduleXCalendar } from '@schedule-x/svelte';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	let calendarApp = $state<CalendarApp>();
	let calendarEvents = $state<CalendarEvent[]>([]);

	onMount(() => {
		calendarEvents = loadAllCalendars(data.events);
		calendarApp = createApp(calendarEvents, data.colors);
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

		<div
			id="eventDetails"
			class="mt-[1.2rem] w-20/20 pl-none lg:mt-0 lg:h-80vh lg:w-7/20 lg:overflow-scroll lg:pl-[1.7rem]"
		>
			<p class="mb-[0.875rem] text-lg type-label">Upcoming Events</p>

			{#each calendarEvents as event (event.id)}
				<Event
					id={event.id}
					title={event.title}
					description={event.description}
					experience={event.experience}
					start={event.start}
					end={event.end}
					location={event.location}
					colors={data.colors[event.calendarId]}
				/>
			{/each}
		</div>
	</div>
</main>
