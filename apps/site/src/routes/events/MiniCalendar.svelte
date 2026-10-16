<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import { type CalendarType } from '@schedule-x/calendar';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { parseZoned } from '$lib/common/components/Calendar/transform';

	import 'temporal-polyfill/global';

	interface Props {
		events: CalendarEvent[];
		colors: Record<string, CalendarType>;
		today: Temporal.PlainDate;
		// ISO dates with upcoming events; every other day is inert
		selectableDays: string[];
		onselect: (day: Temporal.PlainDate) => void;
	}

	let { events, colors, today, selectableDays, onselect }: Props = $props();

	const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const MAX_DOTS = 3;

	let month = $state(today.toPlainYearMonth());
	let selected = $state<Temporal.PlainDate | null>(null);

	let eventsByDay = $derived.by(() => {
		const byDay: Record<string, CalendarEvent[]> = {};
		for (const event of events) {
			const day = parseZoned(event.start).toPlainDate().toString();
			(byDay[day] ??= []).push(event);
		}
		return byDay;
	});

	// Sunday-first grid covering every week that touches this month
	let days = $derived.by(() => {
		const first = month.toPlainDate({ day: 1 });
		const gridStart = first.subtract({ days: first.dayOfWeek % 7 });
		const weeks = Math.ceil(((first.dayOfWeek % 7) + month.daysInMonth) / 7);
		return Array.from({ length: weeks * 7 }, (_, i) => gridStart.add({ days: i }));
	});

	function changeMonth(delta: number) {
		month = month.add({ months: delta });
	}

	function select(day: Temporal.PlainDate) {
		selected = day;
		if (!day.toPlainYearMonth().equals(month)) month = day.toPlainYearMonth();
		onselect(day);
	}
</script>

<div class="rounded-2xl secondary-card p-4">
	<div class="flex items-center justify-between">
		<p class="m-none type-label">
			{month.toPlainDate({ day: 1 }).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
		</p>
		<div class="flex gap-1">
			<button
				type="button"
				class="flex cursor-pointer items-center rounded-md border-none bg-transparent p-1 text-2 hover:background-4"
				aria-label="Previous month"
				onclick={() => changeMonth(-1)}
			>
				<ChevronLeft size={16} />
			</button>
			<button
				type="button"
				class="flex cursor-pointer items-center rounded-md border-none bg-transparent p-1 text-2 hover:background-4"
				aria-label="Next month"
				onclick={() => changeMonth(1)}
			>
				<ChevronRight size={16} />
			</button>
		</div>
	</div>

	<div class="grid grid-cols-7 mt-4 gap-y-1 text-center">
		{#each WEEKDAYS as weekday, i (i)}
			<span class="pb-1 type-label text-2">{weekday}</span>
		{/each}

		{#each days as day (day.toString())}
			{@const dayEvents = eventsByDay[day.toString()] ?? []}
			{@const inMonth = day.month === month.month}
			{@const isToday = day.equals(today)}
			{@const isSelected = selected?.equals(day)}
			{@const selectable = selectableDays.includes(day.toString())}
			{@const style = isSelected
				? 'bg-blue-9 text-blue-1'
				: isToday
					? 'bg-bluedark-3 text-bluedark-11'
					: selectable
						? 'bg-transparent text hover:background-4'
						: 'bg-transparent text-2'}
			<button
				type="button"
				class="mx-auto h-9 w-9 flex flex-col items-center justify-center gap-1 rounded-lg border-none p-0 type-label transition-colors {style} {selectable
					? 'cursor-pointer'
					: 'cursor-default'} {inMonth ? '' : 'opacity-35'}"
				aria-label="{day.toLocaleString('en-US', {
					month: 'long',
					day: 'numeric'
				})}, {dayEvents.length} events"
				aria-pressed={isSelected}
				disabled={!selectable}
				onclick={() => select(day)}
			>
				<span class="leading-none">{day.day}</span>
				<span class="h-1.5 flex gap-0.5">
					{#each dayEvents.slice(0, MAX_DOTS) as event (event.id)}
						<span
							class="h-1.5 w-1.5 rounded-full"
							style:background-color={colors[event.calendarId]?.lightColors?.container}
						></span>
					{/each}
				</span>
			</button>
		{/each}
	</div>
</div>
