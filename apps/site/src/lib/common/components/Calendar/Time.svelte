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

	function formatPlainTime(plainTime: Temporal.PlainTime): string {
		const tempDate = new Date(`2000-01-01T${plainTime.toString()}`);
		return new Intl.DateTimeFormat(undefined, timeFormat).format(tempDate);
	}
</script>

<div class="mt-none flex items-center gap-2 lg:col-start-1 lg:col-end-5">
	<Clock size={18} />
	<p class="m-none type-label">
		{new Intl.DateTimeFormat('en-US', weekDayFormat).format(new Date(start.toLocaleString()))}
		({new Intl.DateTimeFormat('en-US', dateFormat).format(new Date(start.toLocaleString()))})
		{formatPlainTime(start.toPlainTime())} -
		{formatPlainTime(end.toPlainTime())}
		<br />
	</p>
</div>
