<script lang="ts">
	import type { z } from 'zod';
	import type { _EventsQueryResult } from '../../+page';

	import { Calendar, Map } from 'lucide-svelte';
	// import { siGooglecalendar } from 'simple-icons';

	const dateTimeFormat = new Intl.DateTimeFormat('en', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

	export let events: z.infer<typeof _EventsQueryResult>;
</script>

<div class="events">
	{#if events.length > 0}
		{@const currentEvent = events[0]}
		<div class="current">
			<Calendar size={16} />
			<h2>
				{dateTimeFormat.formatRange(currentEvent.start, currentEvent.end)},<br />
				<span class="title">{currentEvent.title}</span>
			</h2>
			<p class="description">{currentEvent.description}</p>
			<div class="info">
				<div class="location">
					<Map size={16} />
					<span>{currentEvent.location}</span>
				</div>
				<!-- TODO: calendar download links -->
				<!-- <div class="google-calendar">
				<div class="icon">
					<svg
						width={(22 / 24) * 16}
						height={(22 / 24) * 16}
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
					>
						<path d={siGooglecalendar.path} />
					</svg>
				</div>
				<span>Add to Google Calendar</span>
			</div>
			<div class="download">
				<Calendar size={16} />
				<span>Download ICS</span>
			</div> -->
			</div>
		</div>
	{/if}
	<!-- <div class="next"></div> -->
</div>

<style lang="scss">
	.events {
		margin: 16px;
		display: grid;
		gap: 16px;

		// @media (min-width: 1024px) {
		// 	grid-template-columns: 7fr 5fr;
		// }
	}

	.current {
		padding: 32px 80px 80px 24px;
		border-radius: 32px;
		color: #000;
		background-color: var(--cyber-blue-5);
		font-feature-settings:
			'dlig' on,
			'ss05' on;
		font-family: CommitMono;
		font-size: 16px;
		font-weight: 400;
		line-height: 145%;

		h2 {
			margin: 24px 0 32px 0;
			font-family: TASAExplorer;
			font-size: 32px;
			font-style: normal;
			font-weight: 500;
			line-height: 130%;

			.title {
				color: var(--cyber-blue-2);
			}
		}

		.description {
			margin: 32px 0 40px 0;
		}

		.info {
			margin: 40px 0 0 0;

			> * {
				display: flex;
				align-items: center;
				gap: 12px;
				font-size: 14px;
				line-height: 145%;
				margin: 8px 0;

				.icon {
					width: 16px;
					height: 16px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.next {
		border-radius: 32px;
		background: #1c1c1c;
	}
</style>
