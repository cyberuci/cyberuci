import { GOOGLE_CALENDAR_API_KEY } from '$env/static/private';

export interface GoogleCalendarEvent {
	kind: 'calendar#event';
	etag: string;
	id: string;
	status: 'confirmed' | 'tentative' | 'cancelled';
	htmlLink: string;
	created: string;
	updated: string;
	summary: string;
	description?: string;
	location?: string;
	creator: { email: string; self?: boolean };
	organizer: { email: string; self?: boolean };
	start: {
		dateTime?: string;
		date?: string;
		timeZone?: string;
	};
	end: {
		dateTime?: string;
		date?: string;
		timeZone?: string;
	};
	iCalUID: string;
	sequence: number;
	reminders: { useDefault: boolean };
	eventType: 'default' | 'outOfOffice' | 'focusTime';
}

export const load = async () => {
	const CALENDAR_IDs = {
		Networking:
			'c_ffeb03c12c883c8f5d1638fecc00add84e795d5d35ac417011a2aba3a2072cad@group.calendar.google.com',
		General:
			'c_807f21e21257c1601714e7410f5a4d507be844f565db927629770fd0dc41e1df@group.calendar.google.com',
		CTF: 'c_321fdac9dfcd3c938f08eb9e9f2e0f2c2664f1de200c803b36331054d0571257@group.calendar.google.com'
	};

	const calendar_info: Record<string, GoogleCalendarEvent[]> = {};

	for (const [calendar_name, calendar_id] of Object.entries(CALENDAR_IDs)) {
		const url = `https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=2026-01-01T00:00:00Z&timeMax=2026-07-01T00:00:00Z&singleEvents=true&orderBy=startTime`;

		const response = await fetch(url);
		const data = await response.json();

		calendar_info[calendar_name] = data.items || [];
	}

	return { events: calendar_info || [] };
};
