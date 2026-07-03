<script lang="ts">
	import { resolve } from '$app/paths';
	import { CalendarDays, MapPin, CalendarPlus, Download, ArrowRight } from 'lucide-svelte';
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { downloadIcs, openGoogleCalendar } from '$lib/common/components/Calendar/eventLinks';
	import { siDiscord } from 'simple-icons';
	import Time from '$lib/common/components/Calendar/Time.svelte';
	import Heading from '../heading.svelte';

	interface Props {
		event: CalendarEvent;
	}

	let { event }: Props = $props();
	const featured = $derived(event ?? null);

	function addToGoogleCalendar() {
		if (!featured) return;
		openGoogleCalendar(featured);
	}

	function downloadEventIcs() {
		if (!featured) return;
		downloadIcs(featured);
	}
	const DISCORD_URL = 'https://discord.cyberuci.com/';
</script>

<div class="my-12 space-x">
	<Heading heading="Upcoming Events" />
	<div class="grid grid-cols-1 mt-4 gap-3 md:grid-cols-2">
		<!-- Featured event card -->
		<div class="featured-card flex flex-col gap-4 rounded-2xl p-6 shadow-sm ring-1 ring-blue-9/10">
			<CalendarDays size={20} />
			{#if featured}
				<div>
					<Time start={featured.start} end={featured.end} />
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
						onclick={addToGoogleCalendar}
					>
						<CalendarPlus size={16} />
						<span>Add to Google Calendar</span>
					</button>
					<button
						type="button"
						class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
						style="color: white;"
						onclick={downloadEventIcs}
					>
						<Download size={16} />
						<span>Download ICS</span>
					</button>
				</div>
			{:else}
				<div>
					<p class="type-body-2 font-medium">Coming up</p>
					<h2 class="title type-heading-1">No events scheduled right now.</h2>
				</div>
			{/if}
		</div>

		{#if featured}
			<a
				href={resolve('/events')}
				class="secondary-card group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 decoration-none transition-shadow hover:shadow-md"
			>
				<CalendarDays size={28} class="opacity-80 transition-transform group-hover:scale-110" />
				<span class="flex items-center gap-1 type-label">
					View full calendar
					<ArrowRight size={14} class="transition-transform group-hover:translate-x-0.5" />
				</span>
			</a>
		{:else}
			<a
				href={DISCORD_URL}
				class="secondary-card group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 decoration-none transition-shadow hover:shadow-md"
			>
				<svg class="mr-2 size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d={siDiscord.path} />
				</svg>
				<span class="flex items-center gap-1 type-label">
					Join our Discord to stay up to date!
					<ArrowRight size={14} class="transition-transform group-hover:translate-x-0.5" />
				</span>
			</a>
		{/if}
	</div>
</div>

<style>
	.featured-card {
		background-color: #0b2945;
		color: #cae6ff;
	}
	.title {
		color: #75bbff;
	}

	.secondary-card {
		background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
		color: #eeeeee;
	}
</style>
