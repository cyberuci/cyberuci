import { GOOGLE_CALENDER_API_KEY } from '$env/static/private';

export const load = async () => {
	const CALENDAR_ID = 'c_emjqko59hf0ad1li3omuek40l0@group.calendar.google.com';
	const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDER_API_KEY}&timeMin=2026-01-01T00:00:00Z`;

	const response = await fetch(url);
	const data = await response.json();

	return { events: data.items || [] };
};
