import { env } from '$env/dynamic/public';

import { _formatCalendarData } from '$lib/common/components/Calendar/calendarData';
import { loadAllCalendars } from '$lib/common/components/Calendar/transform';

export const load = async ({ setHeaders }) => {
	// browser caches for 1 minute, server caches for 5 minutes
	setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300' });

	const { events, colors } = await _formatCalendarData();

	return {
		events: loadAllCalendars(events),
		colors,
		eventIdeasFormUrl: env.PUBLIC_EVENT_IDEAS_FORM_URL ?? null
	};
};
