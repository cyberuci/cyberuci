<script lang="ts">
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import { Temporal } from 'temporal-polyfill';
	import { siDiscord } from 'simple-icons';
	import DOMPurify from 'dompurify';
	import { ArrowRight, ChevronDown, ChevronUp, X } from 'lucide-svelte';

	import type { PageProps } from './$types';
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { parseZoned, TIME_ZONE } from '$lib/common/components/Calendar/transform';
	import Title from '$lib/common/components/Title.svelte';
	import SectionHeading from '$lib/common/components/SectionHeading.svelte';
	import AddToCalendar from '$lib/common/components/Calendar/AddToCalendar.svelte';
	import Event from './Event.svelte';
	import MiniCalendar from './MiniCalendar.svelte';

	import 'temporal-polyfill/global';

	const DISCORD_URL = 'https://discord.cyberuci.com/';
	const SPOTLIGHT_MS = 2500;

	interface Group {
		id: string;
		title: string;
		events: CalendarEvent[];
		later: boolean;
	}

	let { data }: PageProps = $props();

	const calendarEvents = data.events;
	const calendarTypes = Object.keys(data.colors);
	const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE);
	const today = now.toPlainDate();

	// calendar types picked in the sidebar; none picked means show everything
	let selectedTypes = $state<string[]>([]);
	let showLater = $state(false);
	// ids of the events highlighted after a day is clicked in the mini calendar
	let spotlight = $state<string[]>([]);
	let spotlightTimer: ReturnType<typeof setTimeout> | undefined;

	let visibleEvents = $derived(
		calendarEvents.filter(
			(event) => selectedTypes.length === 0 || selectedTypes.includes(event.calendarId)
		)
	);

	let upcoming = $derived(
		visibleEvents
			.map((event) => ({ event, start: parseZoned(event.start) }))
			.filter(({ start }) => Temporal.ZonedDateTime.compare(start, now) > 0)
			.sort((a, b) => Temporal.ZonedDateTime.compare(a.start, b.start))
	);

	let featured = $derived(upcoming[0]?.event ?? null);
	let upcomingDays = $derived([
		...new Set(upcoming.map(({ start }) => start.toPlainDate().toString()))
	]);

	let groups = $derived.by(() => {
		const nextWeekStart = today.subtract({ days: today.dayOfWeek % 7 }).add({ weeks: 1 });
		const laterStart = nextWeekStart.add({ weeks: 1 });

		const result: Group[] = [];
		for (const { event, start } of upcoming) {
			const day = start.toPlainDate();
			let id: string, title: string;

			if (Temporal.PlainDate.compare(day, nextWeekStart) < 0) {
				[id, title] = ['this-week', 'This week'];
			} else if (Temporal.PlainDate.compare(day, laterStart) < 0) {
				[id, title] = ['next-week', 'Next week'];
			} else {
				const month = day.toPlainYearMonth();
				id = `month-${month.toString()}`;
				title = month.equals(today.toPlainYearMonth())
					? 'Later this month'
					: day.toLocaleString('en-US', {
							month: 'long',
							year: month.year === today.year ? undefined : 'numeric'
						});
			}

			if (result.at(-1)?.id !== id) {
				result.push({ id, title, events: [], later: id.startsWith('month-') });
			}
			result.at(-1)!.events.push(event);
		}
		return result;
	});

	let laterCount = $derived(
		groups.filter((group) => group.later).reduce((n, group) => n + group.events.length, 0)
	);
	let shownGroups = $derived(groups.filter((group) => showLater || !group.later));

	async function selectDay(day: Temporal.PlainDate) {
		const dayEvents = upcoming
			.filter(({ start }) => start.toPlainDate().equals(day))
			.map(({ event }) => event);
		if (dayEvents.length === 0) return;

		if (groups.some((group) => group.later && group.events.includes(dayEvents[0]))) {
			showLater = true;
			await tick();
		}

		document
			.getElementById(`event-${dayEvents[0].id}`)
			?.scrollIntoView({ behavior: 'smooth', block: 'center' });

		spotlight = dayEvents.map((event) => event.id);
		clearTimeout(spotlightTimer);
		spotlightTimer = setTimeout(() => (spotlight = []), SPOTLIGHT_MS);
	}

	function toggleType(type: string) {
		selectedTypes = selectedTypes.includes(type)
			? selectedTypes.filter((t) => t !== type)
			: [...selectedTypes, type];
	}

	function relativeDay(date: Temporal.PlainDate) {
		const days = date.since(today).days;
		if (days === 0) return 'Today';
		if (days === 1) return 'Tomorrow';
		return date.toLocaleString('en-US', { weekday: 'long' });
	}

	let featuredInfo = $derived.by(() => {
		if (!featured) return null;
		const start = parseZoned(featured.start);
		const end = parseZoned(featured.end);
		const time = (zdt: Temporal.ZonedDateTime) =>
			zdt.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });
		return {
			month: start.toLocaleString('en-US', { month: 'short' }),
			day: start.day,
			when: relativeDay(start.toPlainDate()),
			time: `${time(start)} – ${time(end)}`,
			description: browser && featured.description ? DOMPurify.sanitize(featured.description) : ''
		};
	});
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Events" />

	<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-[19rem_1fr]">
		<aside
			class="[scrollbar-width:thin] order-2 flex flex-col gap-4 lg:sticky lg:top-24 lg:order-1 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
		>
			<MiniCalendar
				events={visibleEvents}
				colors={data.colors}
				{today}
				selectableDays={upcomingDays}
				onselect={selectDay}
			/>

			{#if calendarTypes.length > 1}
				<div class="rounded-2xl secondary-card p-4">
					<div class="flex flex-wrap gap-2">
						{#each calendarTypes as type (type)}
							{@const selected = selectedTypes.includes(type)}
							<button
								type="button"
								class="flex cursor-pointer items-center gap-2 border rounded-full border-solid px-2.5 py-0.5 type-label transition-colors {selected
									? 'border-blue-9 bg-bluedark-3 text-bluedark-12'
									: 'border-gray-5 bg-transparent text-2 dark:border-graydark-5 hover:border-gray-7 dark:hover:border-graydark-7'}"
								aria-pressed={selected}
								onclick={() => toggleType(type)}
							>
								<span
									class="h-2 w-2 rounded-full"
									style:background-color={data.colors[type]?.lightColors?.container}
								></span>
								{type}
							</button>
						{/each}
					</div>
					{#if selectedTypes.length > 0}
						<button
							type="button"
							class="mt-3 flex cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-1 py-0.5 type-label text-2 transition-colors hover:text"
							onclick={() => (selectedTypes = [])}
						>
							<X size={14} />
							Clear filters
						</button>
					{/if}
				</div>
			{/if}
		</aside>

		<section class="order-1 lg:order-2">
			{#each shownGroups as group, i (group.id)}
				<div class={i > 0 ? 'mt-10' : ''}>
					<SectionHeading heading={group.title} />
				</div>

				<div class="mt-3">
					{#each group.events as event (event.id)}
						{#if event === featured && featuredInfo}
							<div
								id="event-{event.id}"
								class="mb-2 flex flex-wrap scroll-mt-28 gap-4 rounded-2xl bg-bluedark-3 p-5 shadow-sm ring-1 transition-shadow duration-500 md:flex-nowrap {spotlight.includes(
									event.id
								)
									? 'ring-blue-9'
									: 'ring-blue-9/10'}"
							>
								<div class="w-[3rem] flex shrink-0 flex-col items-center pt-1">
									<span class="type-label text-bluedark-11 uppercase">{featuredInfo.month}</span>
									<span class="text-2xl text-blue-7 leading-none font-sans">{featuredInfo.day}</span
									>
								</div>
								<div class="min-w-0 flex-1">
									<p class="m-none type-label text-bluedark-11 uppercase">
										Up next · {featuredInfo.when}
									</p>
									<h2 class="m-none mt-1 type-heading-2 text-blue-7">{event.title}</h2>
									<p class="m-none mt-1 type-label text-bluedark-12">
										{[featuredInfo.time, event.location].filter(Boolean).join(' · ')}
									</p>
									{#if featuredInfo.description}
										<div class="mt-3 type-body-1 line-height-relaxed">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html featuredInfo.description}
										</div>
									{/if}
								</div>
								<div class="flex shrink-0 items-center pl-14 md:pl-0">
									<AddToCalendar {event} />
								</div>
							</div>
						{:else}
							<Event
								{event}
								colors={data.colors[event.calendarId]}
								spotlight={spotlight.includes(event.id)}
							/>
						{/if}
					{/each}
				</div>
			{:else}
				{#if selectedTypes.length > 0}
					<p class="m-none type-body-1 text-2">No upcoming events match these filters.</p>
				{:else}
					<a
						href={DISCORD_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-bluedark-3 p-6 text-blue-7 decoration-none ring-1 ring-blue-9/10"
					>
						<span class="type-heading-2">No upcoming events right now.</span>
						<span class="flex items-center gap-2 type-label">
							<svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d={siDiscord.path} />
							</svg>
							Join our Discord to stay up to date
							<ArrowRight size={14} class="transition-transform group-hover:translate-x-0.5" />
						</span>
					</a>
				{/if}
			{/each}

			{#if laterCount > 0}
				<button
					type="button"
					class="mt-6 flex cursor-pointer items-center gap-1 border border-gray-5 rounded-full border-solid bg-transparent px-3 py-1 type-label text-bluedark-11 transition-colors dark:border-graydark-5 hover:bg-bluedark-3"
					onclick={() => (showLater = !showLater)}
				>
					{#if showLater}
						<ChevronUp size={14} /> Hide later events
					{:else}
						<ChevronDown size={14} /> Show later events ({laterCount})
					{/if}
				</button>
			{/if}
		</section>
	</div>
</main>
