<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import 'temporal-polyfill/global';
	import { Clock } from 'lucide-svelte';
	import { parseZoned } from './transform';

	interface Props {
		start: string;
		end: string;
	}

	let { start, end }: Props = $props();

	const startZdt = $derived(parseZoned(start));
	const endZdt = $derived(parseZoned(end));

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
		{new Intl.DateTimeFormat('en-US', weekDayFormat).format(new Date(startZdt.toLocaleString()))}
		({new Intl.DateTimeFormat('en-US', dateFormat).format(new Date(startZdt.toLocaleString()))})
		{formatPlainTime(startZdt.toPlainTime())} -
		{formatPlainTime(endZdt.toPlainTime())}
		<br />
	</p>
</div>
