<script lang="ts">
	import { resolve } from '$app/paths';
	import { CalendarDays, MapPin, CalendarPlus, Download, ArrowRight } from 'lucide-svelte';
	import type { HomepageCalEvent } from '../../+page.server';

	interface Props {
		events: HomepageCalEvent[];
	}

	let { events }: Props = $props();
	const featured = $derived(events[0] ?? null);
	const rest = $derived(events.slice(1, 3));
</script>

<div class="my-24 space-x">
	<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
		<!-- Featured event card -->
		<div class="featured-card flex flex-col gap-4 rounded-2xl p-6">
			<CalendarDays size={20} />
			{#if featured}
				<div>
					<p class="type-body-2 font-medium">{featured.dateLabel}</p>
					<h2 class="title type-heading-1">{featured.title}</h2>
				</div>
				{#if featured.description}
					<p class="type-body-1 line-height-relaxed">{featured.description}</p>
				{/if}
				<div class="mt-auto flex flex-col gap-2 pt-4">
					{#if featured.location}
						<button
							type="button"
							class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
							style="color: white;"
						>
							<MapPin size={16} />
							<span>{featured.location}</span>
						</button>
					{/if}
					<button
						type="button"
						class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
						style="color: white;"
					>
						<CalendarPlus size={16} />
						<span>Add to Google Calendar</span>
					</button>
					<button
						type="button"
						class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
						style="color: white;"
					>
						<Download size={16} />
						<span>Download ICS</span>
					</button>
				</div>
			{:else}
				<div>
					<p class="type-body-2 font-medium">Coming up</p>
					<h2 class="title type-heading-1">Check our calendar for upcoming events</h2>
				</div>
			{/if}
		</div>

		<!-- Upcoming events card -->
		<div class="secondary-card flex flex-col rounded-2xl p-6">
			<p class="label mb-4 type-body-2 font-medium tracking-widest uppercase">Upcoming</p>
			{#if rest.length > 0}
				<ul class="m-0 flex flex-col list-none p-0">
					{#each rest as ev, i (ev.calendarId + ev.dateLabel)}
						<li
							class="flex flex-col gap-0.5 py-4 pl-3 {i > 0 ? 'item-border' : ''}"
							style="border-left: 3px solid {ev.colors.main}"
						>
							<p class="date type-body-2">{ev.dateLabel}</p>
							<p class="event-title type-body-1 font-medium">{ev.title}</p>
							{#if ev.location}
								<p class="location flex items-center gap-1 type-body-2">
									<MapPin size={12} />
									{ev.location}
								</p>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="date type-body-1">No more upcoming events</p>
			{/if}
			<a
				href={resolve('/events')}
				class="view-all mt-auto flex items-center gap-2 pt-6 type-body-1 decoration-none"
			>
				<span>View all events</span>
				<ArrowRight size={16} />
			</a>
		</div>
	</div>
</div>

<style>
	.featured-card {
		background-color: #e1f1ff;
		color: #1b3d5d;
	}
	.title {
		color: #2975ba;
	}
	@media (prefers-color-scheme: dark) {
		.featured-card {
			background-color: #0b2945;
			color: #cae6ff;
		}
		.title {
			color: #75bbff;
		}
	}

	.secondary-card {
		background-color: #f4f4f4;
		color: #202020;
	}
	.label,
	.date,
	.location {
		color: #8d8d8d;
	}
	.event-title {
		color: #202020;
	}
	.item-border {
		border-top: 1px solid #e8e8e8;
	}
	.view-all {
		color: #202020;
	}

	@media (prefers-color-scheme: dark) {
		.secondary-card {
			background-color: #222222;
			color: #eeeeee;
		}
		.label,
		.date,
		.location {
			color: #8d8d8d;
		}
		.event-title,
		.view-all {
			color: #eeeeee;
		}
		.item-border {
			border-top: 1px solid #2e2e2e;
		}
	}
</style>
