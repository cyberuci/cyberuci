import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { _formatCalendarData } from '$lib/common/components/Calendar/calendarData';
import { loadAllCalendars } from '$lib/common/components/Calendar/transform';
import { buildIcsContent, safeFilename } from '$lib/common/components/Calendar/eventLinks';

// Served as a real text/calendar response (not a client-side blob) so iPhones and Macs
// open Calendar's "Add event" sheet instead of saving a file.
export const GET: RequestHandler = async ({ params }) => {
	const { events } = await _formatCalendarData();
	const event = loadAllCalendars(events).find((e) => e.id === params.id);

	if (!event) error(404, 'Event not found');

	return new Response(buildIcsContent(event), {
		headers: {
			'content-type': 'text/calendar; charset=utf-8',
			'content-disposition': `inline; filename="${safeFilename(event.title)}.ics"`,
			'cache-control': 'public, max-age=60, s-maxage=300'
		}
	});
};
