import type { CalendarEvent } from './types';

function formatInstantUtc(instant: Temporal.Instant): string {
	return instant
		.toString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}Z$/, 'Z');
}

function toIcsUtc(zdt: Temporal.ZonedDateTime): string {
	return formatInstantUtc(zdt.toInstant());
}

function escapeIcsText(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/,/g, '\\,')
		.replace(/;/g, '\\;');
}

function plainText(value: string): string {
	return value
		.replace(/<[^>]*>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function safeFilename(title: string): string {
	const cleaned = title
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
	return cleaned || 'event';
}

export function buildGoogleCalendarUrl(event: CalendarEvent): string {
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: event.title,
		dates: `${toIcsUtc(event.start)}/${toIcsUtc(event.end)}`
	});

	const details = plainText(event.description);
	if (details) params.set('details', details);
	if (event.location) params.set('location', event.location);

	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(event: CalendarEvent): string {
	const description = plainText(event.description);
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Cyber @ UCI//Events//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${escapeIcsText(event.id)}@cyberuci.com`,
		`DTSTAMP:${formatInstantUtc(Temporal.Now.instant())}`,
		`DTSTART:${toIcsUtc(event.start)}`,
		`DTEND:${toIcsUtc(event.end)}`,
		`SUMMARY:${escapeIcsText(event.title)}`
	];

	if (description) lines.push(`DESCRIPTION:${escapeIcsText(description)}`);
	if (event.location) lines.push(`LOCATION:${escapeIcsText(event.location)}`);

	lines.push('END:VEVENT', 'END:VCALENDAR');

	return `${lines.join('\r\n')}\r\n`;
}

export function openGoogleCalendar(event: CalendarEvent): void {
	window.open(buildGoogleCalendarUrl(event), '_blank', 'noopener,noreferrer');
}

export function downloadIcs(event: CalendarEvent): void {
	const blob = new Blob([buildIcsContent(event)], { type: 'text/calendar;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = `${safeFilename(event.title)}.ics`;
	anchor.click();
	URL.revokeObjectURL(url);
}
