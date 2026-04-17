<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
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

	let { id, title, start, end, location }: Props = $props();

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

<div>
	{#if Temporal.PlainDateTime.compare(currentTime, start) == -1}
		<div
			class="mb-10px w-full rounded-md bg-#3D3D3D pb-17px pl-17px pr-17px pt-1px"
			id="{id}_side_view"
		>
			<p class="type-label">
				<b>
					{new Intl.DateTimeFormat(undefined, timeOptions).format(start.toPlainTime())} -
					{new Intl.DateTimeFormat(undefined, timeOptions).format(end.toPlainTime())}
					{new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(start.toLocaleString()))}
				</b>: {title}
			</p>

			<div class="flex flex-row">
				{#if location != ''}
					<span class="type-label"
						><i class="fa fa-map-marker" aria-hidden="true"></i> {location}</span
					>
				{/if}
			</div>
		</div>
	{/if}
</div>
