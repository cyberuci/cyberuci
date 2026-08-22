<script lang="ts">
	import { onMount } from 'svelte';
	import { Temporal } from 'temporal-polyfill';
	import { siDiscord } from 'simple-icons';
	import { ScheduleXCalendar } from '@schedule-x/svelte';
	import { type CalendarApp } from '@schedule-x/calendar';

	import type { PageProps } from './$types';
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { loadAllCalendars, parseZoned } from '$lib/common/components/Calendar/transform';
	import { createApp } from '$lib/common/components/Calendar/calendarApp';
	import Title from '$lib/common/components/Title.svelte';
	import Event from './Event.svelte';

	// calendar styles live next to this page so they don't pollute app.css
	import './calendar.css';
	import '@schedule-x/theme-default/dist/index.css';
	import 'temporal-polyfill/global';

	const DISCORD_URL = 'https://discord.cyberuci.com/';
	const TIME_ZONE = 'America/Los_Angeles';

	let { data }: PageProps = $props();

	let calendarApp = $state<CalendarApp>();
	let calendarEvents = $state<CalendarEvent[]>(loadAllCalendars(data.events));
	let eventGroups = $derived.by(() => {
		const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE);
		const comingSoonUntil = now.add({ days: 7 });
		const nextWeekUntil = now.add({ days: 14 });

		const comingSoon: CalendarEvent[] = [];
		const nextWeek: CalendarEvent[] = [];
		const later: CalendarEvent[] = [];

		for (const event of calendarEvents) {
			const start = parseZoned(event.start);
			if (Temporal.ZonedDateTime.compare(start, now) <= 0) continue;

			if (Temporal.ZonedDateTime.compare(start, comingSoonUntil) <= 0) {
				comingSoon.push(event);
			} else if (Temporal.ZonedDateTime.compare(start, nextWeekUntil) <= 0) {
				nextWeek.push(event);
			} else {
				later.push(event);
			}
		}

		return [
			{ title: 'Coming Soon', events: comingSoon },
			{ title: 'Next Week', events: nextWeek },
			{ title: 'Later', events: later }
		].filter((group) => group.events.length > 0);
	});

	onMount(() => {
		calendarApp = createApp(calendarEvents, data.colors);
	});
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Events" />

	<div class="flex flex-col flex-wrap lg:flex-row lg:items-start">
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
			{#if eventGroups.length > 0}
				{#each eventGroups as group, i (group.title)}
					<p class="mb-[0.875rem] text-base type-label {i > 0 ? 'mt-6' : 'mt-0'}">{group.title}</p>

					{#each group.events as event (event.id)}
						<Event
							id={event.id}
							title={event.title}
							description={event.description}
							eventType={event.calendarId}
							experience={event.experience}
							start={event.start}
							end={event.end}
							location={event.location}
							colors={data.colors[event.calendarId]}
						/>
					{/each}
				{/each}
			{:else}
				<div class="flex flex-col gap-6">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a
						class="w-full no-underline"
						href={DISCORD_URL}
						target="_blank"
						rel="noopener noreferrer"
					>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
						<span
							class="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-blue-1 px-3 py-3 dark:bg-[#75bbff]"
							style="color: #000;"
						>
							<svg
								class="size-5"
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								fill="#000"
								aria-hidden="true"
							>
								<path d={siDiscord.path} />
							</svg>
							<span class="type-label">Join our Discord to stay up to date</span>
						</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
</main>
