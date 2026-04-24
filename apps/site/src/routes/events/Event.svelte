<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import { CalendarColors } from '$lib/common/components/Calendar/constants';

	import 'temporal-polyfill/global';

	interface Props {
		id: string;
		title: string;
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
		calendarId: string;
		location: string;
	}

	let currentTime = Temporal.Now.zonedDateTimeISO();

	let { id, title, start, calendarId, location }: Props = $props();

	let dateOptions: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	let timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric'
	};
</script>

{#if Temporal.PlainDateTime.compare(currentTime, start) == -1}
	<div
		class="mb-[10px] w-full flex flex-row rounded-md bg-[#333333] color-[#fff]"
		id="{id}_side_view"
	>
		<div
			class="w-2/100 rounded-l-md lg:w-3/100"
			style:background-color={CalendarColors[calendarId]?.lightColors?.main}
		></div>

		<div class="lg: width: 97/100 w-98/100 pl-[17px] pr-[17px] pt-[1px]">
			<p class="type-label">
				<b>
					{new Intl.DateTimeFormat(undefined, timeOptions).format(start.toPlainTime())}
					<!-- {new Intl.DateTimeFormat(undefined, timeOptions).format(end.toPlainTime())} -->
					{new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(start.toLocaleString()))}
				</b>: {title}
				<br />

				{#if location != ''}
					<span class="block pt-[5px] type-label"
						><i class="fa fa-map-marker" aria-hidden="true"></i> {location}</span
					>
				{/if}
			</p>
		</div>
	</div>
{/if}
