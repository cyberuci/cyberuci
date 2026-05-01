<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import { type CalendarType } from '@schedule-x/calendar';
	import { showDescription } from '$lib/common/components/Calendar/calendarApp';
	import DOMPurify from 'dompurify';

	import Time from './Time.svelte';

	import { MapPin, CalendarDays, CircleGauge } from 'lucide-svelte';

	import 'temporal-polyfill/global';

	interface Props {
		id: string;
		title: string;
		description: string;
		experience: string;
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
		location: string;
		colors: CalendarType;
	}

	let currentTime = Temporal.Now.zonedDateTimeISO().subtract({ weeks: 10 });

	let { id, title, description, experience, start, end, location, colors }: Props = $props();

	const cleanedDescription = DOMPurify.sanitize(description);
</script>

{#if Temporal.PlainDateTime.compare(currentTime, start) == -1}
	<button
		class="mb-[0.5rem] w-full flex flex-row rounded-md border-none bg-[#333333] p-none text-left color-[#fff]"
		id="{id}_side_view"
		onclick={() => showDescription(id + '_description', true)}
	>
		<div class="w-2/100 rounded-l-md" style:background-color={colors?.lightColors?.main}></div>

		<div class="w-98/100 pb-[0.875rem] pl-[1rem] pr-[1rem] pt-[0.875rem]">
			<div class="m-none mb-[0.5rem] flex items-center gap-2 lg:col-start-1 lg:col-end-5">
				<CalendarDays size={18} class="min-w-[18px]" />
				<b><p class="m-none type-label">{title}</p></b>
			</div>

			<Time {start} {end} />

			<div class="mt-[0.5rem] flex items-center gap-2 lg:col-start-1 lg:col-end-5">
				<CircleGauge size={18} class="min-w-[18px]" />
				<p class="m-none type-label">{experience}</p>
			</div>

			{#if location != ''}
				<div class="mt-[0.5rem] flex items-center gap-2 lg:col-start-1 lg:col-end-5">
					<MapPin size={18} class="min-w-[18px]" />
					<p class="m-none type-label">{location}</p>
				</div>
			{/if}

			{#if description != ''}
				<div id="{id}_description" class="h-[0px] overflow-hidden">
					<hr class="mb-[0.5rem] mt-[0.5rem]" />

					<p class="m-none mt-[0.5rem] type-label">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html cleanedDescription}
					</p>
				</div>
			{/if}
		</div>
	</button>
{/if}
