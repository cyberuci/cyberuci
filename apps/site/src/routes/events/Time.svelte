<script lang="ts">
	import { Temporal } from 'temporal-polyfill';

	import { Clock } from 'lucide-svelte';

	import 'temporal-polyfill/global';

	interface Props {
		start: Temporal.ZonedDateTime;
		end: Temporal.ZonedDateTime;
	}

	let { start, end }: Props = $props();

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

<div class="mt-none flex items-center gap-2 lg:col-start-1 lg:col-end-5">
	<Clock size={18} />
	<p class="m-none type-label">
		{new Intl.DateTimeFormat('en-US', weekDayFormat).format(new Date(start.toLocaleString()))}
		({new Intl.DateTimeFormat('en-US', dateFormat).format(new Date(start.toLocaleString()))})
		{new Intl.DateTimeFormat(undefined, timeFormat).format(start.toPlainTime())} -
		{new Intl.DateTimeFormat(undefined, timeFormat).format(end.toPlainTime())}
		<br />
	</p>
</div>
