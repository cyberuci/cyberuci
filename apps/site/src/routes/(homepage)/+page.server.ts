import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const CALENDAR_URL =
	'https://calendar.google.com/calendar/ical/c_emjqko59hf0ad1li3omuek40l0%40group.calendar.google.com/public/basic.ics';

type CalEvent = { title: string; start: Date; end: Date; location: string; description: string };

function parseDT(val: string): Date {
	const m = val.match(/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
	if (!m) return new Date(NaN);
	const [, Y, M, D, , h = '00', mn = '00', s = '00', utc] = m;
	if (utc) return new Date(`${Y}-${M}-${D}T${h}:${mn}:${s}Z`);
	return new Date(`${Y}-${M}-${D}T${h}:${mn}:${s}-07:00`); // Pacific time
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

async function fetchNextCalEvent(): Promise<{
	title: string;
	dateLabel: string;
	location: string;
	description: string;
} | null> {
	try {
		const res = await fetch(CALENDAR_URL);
		if (!res.ok) {
			console.error('[cal] fetch failed:', res.status);
			return null;
		}
		// Normalize CRLF and unfold folded lines (RFC 5545 §3.1)
		const text = (await res.text())
			.replace(/\r\n/g, '\n')
			.replace(/\r/g, '\n')
			.replace(/\n[ \t]/g, '');
		const now = new Date();
		const upcoming: CalEvent[] = [];

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
				// Skip old open-ended recurring events superseded by newer ones
				const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
				if (!until && start < oneYearAgo) continue;
				const occ = nextWeekly(start, duration, now, until);
				if (occ) upcoming.push({ title: summary, location, description, ...occ });
			} else if (start > now) {
				upcoming.push({ title: summary, start, end, location, description });
			}
		}

		upcoming.sort((a, b) => a.start.getTime() - b.start.getTime());
		const next = upcoming[0];
		if (!next) {
			console.error('[cal] no upcoming events found');
			return null;
		}
		console.error('[cal] next event:', next.title, next.start.toISOString());
		return {
			title: next.title,
			dateLabel: formatEventDate(next.start, next.end),
			location: next.location,
			description: next.description
		};
	} catch (e) {
		console.error('[cal] error:', e);
		return null;
	}
}

const fetchHome = async () => {
	const homePageQuery = defineQuery(`
		*[_type == 'homePage' && _id == "homePage"][0] {
			highlightNews {
				enable,
				article -> {
					title,
					cover,
					date,
					slug,
				},
			},
			competitions {
				subtitle,
				description,
			},
			hackerlab {
				description,
				images,
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
		nextEvent: await fetchNextCalEvent()
	};
};
