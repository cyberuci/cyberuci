<script lang="ts">
	import { browser } from '$app/environment';
	import { type CalendarType } from '@schedule-x/calendar';
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { parseZoned } from '$lib/common/components/Calendar/transform';
	import DOMPurify from 'dompurify';

	import AddToCalendar from '$lib/common/components/Calendar/AddToCalendar.svelte';

	import 'temporal-polyfill/global';

	interface Props {
		event: CalendarEvent;
		colors: CalendarType;
		spotlight?: boolean;
	}

	let { event, colors, spotlight = false }: Props = $props();

	const startZdt = $derived(parseZoned(event.start));
	const endZdt = $derived(parseZoned(event.end));

	const time = (zdt: typeof startZdt) =>
		zdt.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });

	const month = $derived(startZdt.toLocaleString('en-US', { month: 'short' }));
	const weekday = $derived(startZdt.toLocaleString('en-US', { weekday: 'short' }));
	const sameDay = $derived(startZdt.toPlainDate().equals(endZdt.toPlainDate()));
	const timeRange = $derived(
		sameDay
			? `${time(startZdt)} – ${time(endZdt)}`
			: `${time(startZdt)} – ${endZdt.toLocaleString('en-US', { month: 'numeric', day: 'numeric' })} ${time(endZdt)}`
	);

	// DOMPurify needs a DOM and throws during SSR on Cloudflare Workers.
	const cleanedDescription = $derived(
		browser && event.description ? DOMPurify.sanitize(event.description) : ''
	);
</script>

<div
	id="event-{event.id}"
	class="flex scroll-mt-28 items-center gap-3 border-0 border-b border-solid px-1 py-3 transition-colors duration-500 {spotlight
		? 'border-transparent rounded-xl bg-bluedark-3'
		: 'border-gray-4 dark:border-graydark-4'}"
>
	<div
		class="w-[3rem] flex shrink-0 flex-col items-center self-start border-0 border-l-3 border-solid py-0.5"
		style:border-color={colors?.lightColors?.container}
		title={event.calendarId}
	>
		<span class="type-label uppercase {spotlight ? 'text-bluedark-11' : 'text-2'}">{month}</span>
		<span class="text-xl leading-none font-sans {spotlight ? 'text-blue-7' : ''}">
			{startZdt.day}
		</span>
	</div>

	<div class="min-w-0 flex-1">
		<p class="m-none type-body-1 font-medium {spotlight ? 'text-blue-7' : ''}">{event.title}</p>
		<p class="m-none mt-1 type-label text-2">
			{weekday}
			{timeRange}
		</p>
		{#if event.location}
			<p class="m-none mt-0.5 type-label text-2">{event.location}</p>
		{/if}
		{#if cleanedDescription}
			<div class="line-clamp-3 mt-2 type-label">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html cleanedDescription}
			</div>
		{/if}
	</div>

	<AddToCalendar {event} compact />
</div>
