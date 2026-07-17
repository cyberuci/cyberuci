<script lang="ts">
	// Import types
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';

	// Libraries
	import { CalendarPlus, Download } from 'lucide-svelte';
	import { downloadIcs, openGoogleCalendar } from '$lib/common/components/Calendar/eventLinks';

	interface Props {
		event: CalendarEvent | null;
	}

	let { event }: Props = $props();

	const featured = $derived(event ?? null);

	function addToGoogleCalendar() {
		if (!featured) return;
		openGoogleCalendar(featured);
	}

	function downloadEventIcs() {
		if (!featured) return;
		downloadIcs(featured);
	}
</script>

<button
	type="button"
	class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
	style="color: white;"
	onclick={addToGoogleCalendar}
>
	<CalendarPlus size={16} />
	<span>Add to Google Calendar</span>
</button>
<button
	type="button"
	class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
	style="color: white;"
	onclick={downloadEventIcs}
>
	<Download size={16} />
	<span>Download ICS</span>
</button>
