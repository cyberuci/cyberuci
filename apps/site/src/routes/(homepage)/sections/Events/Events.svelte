<script lang="ts">
	import { CalendarDays, MapPin, CalendarPlus, Download } from 'lucide-svelte';

	interface Props {
		event: { title: string; dateLabel: string; location: string; description: string } | null;
	}

	let { event }: Props = $props();
</script>

<div class="my-24 space-x">
	<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
		<!-- Featured event card -->
		<div class="featured-card flex flex-col gap-4 rounded-2xl p-6">
			<CalendarDays size={20} />
			{#if event}
				<div>
					<p class="type-body-2 font-medium">{event.dateLabel}</p>
					<h2 class="title type-heading-1">{event.title}</h2>
				</div>
				{#if event.description}
					<p class="type-body-1 line-height-relaxed">{event.description}</p>
				{/if}
				<div class="mt-auto flex flex-col gap-2 pt-4">
					{#if event.location}
						<button
							type="button"
							class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
							style="color: white;"
						>
							<MapPin size={16} />
							<span>{event.location}</span>
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

		<!-- Secondary card -->
		<div class="secondary-card rounded-2xl"></div>
	</div>
</div>

<style>
	.featured-card {
		background-color: #e1f1ff; /* blue-3 */
		color: #1b3d5d; /* blue-12 */
	}

	.title {
		color: #2975ba; /* blue-9 */
	}

	@media (prefers-color-scheme: dark) {
		.featured-card {
			background-color: #0b2945; /* bluedark-3 */
			color: #cae6ff; /* bluedark-12 */
		}

		.title {
			color: #75bbff; /* bluedark-11 */
		}
	}

	.secondary-card {
		background-color: #222222; /* graydark-3 */
	}
</style>
