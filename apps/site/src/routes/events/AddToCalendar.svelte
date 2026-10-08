<script lang="ts">
	import { CalendarPlus } from 'lucide-svelte';
	import { type CalendarEvent } from '$lib/common/components/Calendar/types';
	import { openGoogleCalendar } from '$lib/common/components/Calendar/eventLinks';

	interface Props {
		event: CalendarEvent;
		// icon only, for list rows where the full label would repeat down the page
		compact?: boolean;
	}

	let { event, compact = false }: Props = $props();
</script>

<button
	type="button"
	class="flex shrink-0 cursor-pointer items-center gap-2 rounded-md border-none bg-transparent type-label text-bluedark-11 transition-colors hover:bg-bluedark-4 hover:text-bluedark-12 {compact
		? 'p-2'
		: 'px-2 py-1'}"
	aria-label={compact ? `Add ${event.title} to Google Calendar` : undefined}
	title={compact ? 'Add to Google Calendar' : undefined}
	onclick={() => openGoogleCalendar(event)}
>
	<CalendarPlus size={compact ? 18 : 16} />
	{#if !compact}Add to Google Calendar{/if}
</button>
