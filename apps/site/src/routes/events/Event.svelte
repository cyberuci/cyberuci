<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import { CalendarColors } from '$lib/common/components/Calendar/constants';
	import { showDescription } from '$lib/common/components/Calendar/calendarApp';

	import Time from './Time.svelte';

	import { MapPin } from 'lucide-svelte';
	import { CalendarDays } from 'lucide-svelte';

	import 'temporal-polyfill/global';

	interface Props {
		id: string;
		title: string;
		description: string;
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
		calendarId: string;
		location: string;
	}

	let currentTime = Temporal.Now.zonedDateTimeISO();

	let { id, title, description, start, end, calendarId, location }: Props = $props();
</script>

{#if Temporal.PlainDateTime.compare(currentTime, start) == -1}
	<button
		class="mb-[10px] w-full flex flex-row rounded-md border-none bg-[#333333] p-none text-left color-[#fff]"
		id="{id}_side_view"
		onclick={() => showDescription(id + '_description', true)}
	>
		<div
			class="w-2/100 rounded-l-md"
			style:background-color={CalendarColors[calendarId]?.lightColors?.main}
		></div>

		<div class="w-98/100 pb-[0.875rem] pl-[17px] pr-[17px] pt-[0.875rem]">
			<div class="m-none mb-[0.5rem] flex items-center gap-2 lg:col-start-1 lg:col-end-5">
				<CalendarDays size={18} fill="#111" />
				<b><p class="m-none type-label">{title}</p></b>
			</div>

			<Time {start} {end} />

			{#if location != ''}
				<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
					<MapPin size={18} />
					<p class="m-none type-label">{location}</p>
				</div>
			{/if}

			{#if description != ''}
				<div id="{id}_description" class="h-[0px] overflow-hidden">
					<hr class="mb-[0.5rem] mt-[0.5rem]" />

					<p class="m-none mt-[0.5rem] type-label">
						{description}
					</p>
				</div>
			{/if}
		</div>
	</button>
{/if}
