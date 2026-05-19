import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

interface SanityCalendar {
	title: string;
	calendarLink: string;
	backgroundColor: { hex: string };
	supportingColor: { hex: string };
	textColor: { hex: string };
}

export type HomepageCalEvent = {
	title: string;
	dateLabel: string;
	location: string;
	description: string;
	calendarId: string;
	colors: { main: string; container: string; onContainer: string };
};

type RawEvent = {
	title: string;
	start: Date;
	end: Date;
	location: string;
	description: string;
	calendarId: string;
	colors: { main: string; container: string; onContainer: string };
};

function parseDT(val: string): Date {
	const m = val.match(/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
	if (!m) return new Date(NaN);
	const [, Y, M, D, , h = '00', mn = '00', s = '00', utc] = m;
	if (utc) return new Date(`${Y}-${M}-${D}T${h}:${mn}:${s}Z`);
	return new Date(`${Y}-${M}-${D}T${h}:${mn}:${s}-07:00`);
}

function nextWeekly(
	base: Date,
	durationMs: number,
	now: Date,
	until?: Date
): { start: Date; end: Date } | null {
	const WEEK = 7 * 24 * 60 * 60 * 1000;
	let t = new Date(base);
	while (t <= now) t = new Date(t.getTime() + WEEK);
	if (until && t > until) return null;
	return { start: t, end: new Date(t.getTime() + durationMs) };
}

function formatEventDate(start: Date, end: Date): string {
	const tz = 'America/Los_Angeles';
	const now = new Date();
	const toDay = (d: Date) =>
		new Date(d.toLocaleDateString('en-US', { timeZone: tz })).toDateString();
	const diffDays = Math.round(
		(new Date(toDay(start)).getTime() - new Date(toDay(now)).getTime()) / 86400000
	);
	const time = (d: Date) =>
		d.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
			timeZone: tz
		});
	const timePart = `${time(start)} – ${time(end)}`;
	if (diffDays === 0) return `Today · ${timePart}`;
	if (diffDays === 1) return `Tomorrow · ${timePart}`;
	const dayPart = start.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		timeZone: tz
	});
	return `${dayPart} · ${timePart}`;
}

function parseICS(
	text: string,
	calendarId: string,
	colors: { main: string; container: string; onContainer: string }
): RawEvent[] {
	const now = new Date();
	const events: RawEvent[] = [];

	for (const block of text.split('BEGIN:VEVENT').slice(1)) {
		const get = (key: string) =>
			block.match(new RegExp(`(?:^|\\n)${key}[^:]*:([^\\r\\n]+)`))?.[1]?.trim() ?? '';

		const summary = get('SUMMARY');
		const location = get('LOCATION');
		const description = get('DESCRIPTION').replace(/\\n/g, ' ').replace(/\\,/g, ',');
		const dtstart = get('DTSTART');
		const dtend = get('DTEND');
		const rrule = get('RRULE');

		if (!summary || !dtstart) continue;
		const start = parseDT(dtstart);
		const end = parseDT(dtend || dtstart);
		if (isNaN(start.getTime())) continue;
		const duration = end.getTime() - start.getTime();

		if (rrule.includes('FREQ=WEEKLY')) {
			const untilM = rrule.match(/UNTIL=([^;]+)/);
			const until = untilM ? parseDT(untilM[1]) : undefined;
			const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
			if (!until && start < oneYearAgo) continue;
			const occ = nextWeekly(start, duration, now, until);
			if (occ) events.push({ title: summary, location, description, calendarId, colors, ...occ });
		} else if (start > now) {
			events.push({ title: summary, start, end, location, description, calendarId, colors });
		}
	}

	return events;
}

async function fetchCalEvents(): Promise<HomepageCalEvent[]> {
	try {
		const calendarQuery = defineQuery(`*[_type == "calendar"] {
			title, calendarLink,
			backgroundColor, supportingColor, textColor
		}`);
		const calendars: SanityCalendar[] = (await client.fetch(calendarQuery)) ?? [];

		if (!calendars.length) return [];

		const allEvents: RawEvent[] = (
			await Promise.all(
				calendars.map(async (cal) => {
					const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(cal.calendarLink)}/public/basic.ics`;
					const res = await fetch(icsUrl);
					if (!res.ok) return [];
					const text = (await res.text())
						.replace(/\r\n/g, '\n')
						.replace(/\r/g, '\n')
						.replace(/\n[ \t]/g, '');
					const colors = {
						main: cal.backgroundColor.hex,
						container: cal.supportingColor.hex,
						onContainer: cal.textColor.hex
					};
					return parseICS(text, cal.title, colors);
				})
			)
		).flat();

		allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

		return allEvents.slice(0, 3).map((ev) => ({
			title: ev.title,
			dateLabel: formatEventDate(ev.start, ev.end),
			location: ev.location,
			description: ev.description,
			calendarId: ev.calendarId,
			colors: ev.colors
		}));
	} catch (e) {
		console.error('[cal] error:', e);
		return [];
	}
}

const fetchHome = async () => {
	const homePageQuery = defineQuery(`
		*[_type == 'homePage' && _id == "homePage"][0] {
			Header { asset, alt },
			competitions {
				image { asset, alt },
				subtitle,
				description,
			},
			hackerlab {
				isOpen,
				images[] { asset, alt },
				description,
			},
		}
  `);

	const homeData = await client.fetch(homePageQuery);

	if (homeData === null) {
		throw Error('Homepage document is null.');
	}

	return homeData;
};

const fetchSocials = async () => {
	const socialsQuery = defineQuery(`
		*[_type == 'info' && _id == "info"][0] {
			socials
		}
	`);

	const socialsData = await client.fetch(socialsQuery);

	if (socialsData === null) {
		throw Error('Socials document is null.');
	}

	return socialsData;
};

export const load: PageServerLoad = async () => {
	return {
		homepage: await fetchHome(),
		socials: await fetchSocials(),
		events: await fetchCalEvents()
	};
};
