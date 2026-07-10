import { type GoogleCalendarEvent, type CalendarEvent } from './types';
import { Temporal } from 'temporal-polyfill';
import 'temporal-polyfill/global';

const TIME_ZONE = 'America/Los_Angeles';

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

export function parseZoned(value: string): Temporal.ZonedDateTime {
	return Temporal.ZonedDateTime.from(value);
}

export function loadAllCalendars(data: Record<string, GoogleCalendarEvent[]>): CalendarEvent[] {
	const events: CalendarEvent[] = [];

	for (const [calendarName, calendarData] of Object.entries(data)) {
		events.push(
			...calendarData.map((event: GoogleCalendarEvent, i: number) => {
				const startStr = event.start.dateTime ?? `${event.start.date}T00:00:00Z`;
				const endStr = event.end.dateTime ?? `${event.end.date}T23:59:59Z`;

				const experienceTitleData = getExperienceLevel(event.summary);
				const start = Temporal.ZonedDateTime.from(`${startStr}[${TIME_ZONE}]`);
				const end = Temporal.ZonedDateTime.from(`${endStr}[${TIME_ZONE}]`);

				return {
					id: event.id || `${i}`,
					title: experienceTitleData[0],
					description: event.description || '',
					experience: experienceTitleData[1],
					// Strings only — Temporal objects break Safari hydration via devalue.
					start: start.toString(),
					end: end.toString(),
					calendarId: calendarName,
					location: event.location ?? ''
				};
			})
		);
	}

	events.sort((a, b) =>
		Temporal.Instant.compare(parseZoned(a.start).toInstant(), parseZoned(b.end).toInstant())
	);

	return events;
}
