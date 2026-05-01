import { type GoogleCalendarEvent, type CalendarEvent } from './types';
import { Temporal } from 'temporal-polyfill';
import 'temporal-polyfill/global';

export function loadAllCalendars(data: Record<string, GoogleCalendarEvent[]>): CalendarEvent[] {
	const events = [];

	for (const [calendarName, calendarData] of Object.entries(data)) {
		events.push(
			...calendarData.map((event: GoogleCalendarEvent, i: number) => {
				const startStr = event.start.dateTime ?? `${event.start.date}T00:00:00Z`;
				const endStr = event.end.dateTime ?? `${event.end.date}T23:59:59Z`;

				return {
					id: event.id || `${i}`,
					title: event.summary,
					description: event.description || '',
					start: Temporal.ZonedDateTime.from(`${startStr}[America/Los_Angeles]`),
					end: Temporal.ZonedDateTime.from(`${endStr}[America/Los_Angeles]`),
					calendarId: calendarName,
					location: event.location ?? ''
				};
			})
		);
	}

	events.sort((a, b) => Temporal.Instant.compare(a.start.toInstant(), b.end.toInstant()));

	return events;
}
