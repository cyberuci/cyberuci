export interface CalendarEvent {
	id: string;
	title: string;
	description: string;
	experienceLevel: string;
	start: Temporal.ZonedDateTime;
	end: Temporal.ZonedDateTime;
	calendarId: string;
	location: string;
}

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
