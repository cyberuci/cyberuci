<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import { CalendarColors } from '$lib/common/components/Calendar/constants';
	import { showDescription } from '$lib/common/components/Calendar/calendarApp';

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

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

	let weekDayFormat: Intl.DateTimeFormatOptions = {
		weekday: 'long'
	};

	let dateFormat: Intl.DateTimeFormatOptions = {
		month: 'numeric',
		day: 'numeric'
	};

	let timeFormat: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric'
	};
</script>

{#if Temporal.PlainDateTime.compare(currentTime, start) == -1}
	<button
		class="mb-[10px] w-full flex flex-row rounded-md border-none bg-[#333333] p-none text-left color-[#fff]"
		id="{id}_side_view"
		onclick={() => showDescription(id + '_description', true)}
	>
		<div
			class="w-2/100 rounded-l-md lg:w-3/100"
			style:background-color={CalendarColors[calendarId]?.lightColors?.main}
		></div>

		<div class="lg: width: 97/100 w-98/100 pl-[17px] pr-[17px] pt-[1px]">
			<p class="type-label">
				<span class="block pt-[5px] type-label">
					<i class="fa-solid fa-calendar"></i> <b>{title} </b><br /></span
				>
				<span class="block pt-[5px] type-label">
					<i class="fa-solid fa-clock"></i>
					{new Intl.DateTimeFormat('en-US', weekDayFormat).format(new Date(start.toLocaleString()))}
					({new Intl.DateTimeFormat('en-US', dateFormat).format(new Date(start.toLocaleString()))})
					{new Intl.DateTimeFormat(undefined, timeFormat).format(start.toPlainTime())} -
					{new Intl.DateTimeFormat(undefined, timeFormat).format(end.toPlainTime())}
					<br /></span
				>

				{#if location != ''}
					<span class="block pt-[5px] type-label"
						><i class="fa fa-map-marker" aria-hidden="true"></i> {location}</span
					>
				{/if}
			</p>

			{#if description != ''}
				<div
					id="{id}_description"
					transition:slide={{ duration: 300, easing: quintOut }}
					class="hide-content hidden"
				>
					<hr />
					<p class="mt-[14px] type-label">
						{description}
					</p>
				</div>
			{/if}
		</div>
	</button>
{/if}
