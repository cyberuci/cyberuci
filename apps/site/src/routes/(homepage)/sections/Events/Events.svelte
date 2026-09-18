<script lang="ts">
	// Import Types
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';

	// Libraries
	import { resolve } from '$app/paths';
	import { CalendarDays, MapPin, ArrowRight } from 'lucide-svelte';
	import { siDiscord } from 'simple-icons';

	// Internal Components and Scripts
	import Time from '$lib/common/components/Calendar/Time.svelte';
	import SectionHeading from '$lib/common/components/SectionHeading.svelte';
	import DownloadCalendar from './DownloadCalendar.svelte';

	interface Props {
		event: CalendarEvent | null;
	}

	let { event }: Props = $props();
	const featured = $derived(event ?? null);

	const DISCORD_URL = 'https://discord.cyberuci.com/';
</script>

<div class="my-12 space-x">
	<SectionHeading heading="Upcoming Events" />
	<div class="grid grid-cols-1 mt-4 gap-3 md:grid-cols-2">
		<!-- Featured event card -->
		<div class="flex flex-col gap-4 rounded-2xl bg-bluedark-3 p-6 shadow-sm ring-1 ring-blue-9/10">
			{#if featured}
				<div>
					<Time start={featured.start} end={featured.end} />
					<h2 class="type-heading-1 text-blue-7">{featured.title}</h2>
				</div>

				{#if featured.description}
					<p class="line-height-relaxed type-body-1">{featured.description}</p>
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

					<DownloadCalendar {event} />
				</div>
			{:else}
				<div>
					<div class="mb-6">
						<CalendarDays size={20} />
					</div>
					<span class="type-heading-1">No events scheduled right now.</span>
				</div>
			{/if}
		</div>

		{#if featured}
			<a
				href={resolve('/events')}
				class="secondary-card group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 decoration-none transition-shadow hover:shadow-md"
			>
				<CalendarDays
					size={28}
					class="text-blue-1 opacity-80 transition-transform group-hover:scale-110"
				/>
				<span class="flex items-center gap-1 type-label text-blue-1">
					View full calendar
					<ArrowRight size={14} class="transition-transform group-hover:translate-x-0.5" />
				</span>
			</a>
		{:else}
			<a
				href={DISCORD_URL}
				class="secondary-card group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-blue-1 decoration-none transition-shadow hover:shadow-md"
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
	.secondary-card {
		background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
	}
</style>
