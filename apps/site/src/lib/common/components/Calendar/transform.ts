import { type GoogleCalendarEvent, type CalendarEvent } from './types';
import { Temporal } from 'temporal-polyfill';
import 'temporal-polyfill/global';

function getExperienceLevel(title: string): string[] {
	let experience = 'Beginner';
	let eventTitleClean = title;
	const levelTag = eventTitleClean.substring(0, 3).toLowerCase();

	if (levelTag == '[h]' || levelTag == '[m]' || levelTag == '[e]' || levelTag == '[b]') {
		eventTitleClean = eventTitleClean.substring(3, eventTitleClean.length).trim();
		switch (levelTag) {
			case '[h]':
				experience = 'Advanced';
				break;
			case '[m]':
				experience = 'Intermediate';
				break;
		}
	}
	return [eventTitleClean, experience];
}

export function loadAllCalendars(data: Record<string, GoogleCalendarEvent[]>): CalendarEvent[] {
	const events = [];

	for (const [calendarName, calendarData] of Object.entries(data)) {
		events.push(
			...calendarData.map((event: GoogleCalendarEvent, i: number) => {
				const startStr = event.start.dateTime ?? `${event.start.date}T00:00:00Z`;
				const endStr = event.end.dateTime ?? `${event.end.date}T23:59:59Z`;

				const experienceTitleData = getExperienceLevel(event.summary);

				return {
					id: event.id || `${i}`,
					title: experienceTitleData[0],
					description: event.description || '',
					experience: experienceTitleData[1],
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
