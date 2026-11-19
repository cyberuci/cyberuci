import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { getSiteSettings } from '$lib/sanity/siteSettings.server';
import { defineQuery } from 'groq';
import { _formatCalendarData } from '$lib/common/components/Calendar/calendarData';
import { Temporal } from 'temporal-polyfill';
import 'temporal-polyfill/global';

import { loadAllCalendars, parseZoned } from '$lib/common/components/Calendar/transform';

const fetchNextCalEvent = async () => {
	const calendarEvent = await _formatCalendarData();
	const allCalendars = loadAllCalendars(calendarEvent.events);

	const upcomingEvents = allCalendars.filter(
		(event) =>
			Temporal.PlainDateTime.compare(Temporal.Now.zonedDateTimeISO(), parseZoned(event.start)) ===
			-1
	);

	if (upcomingEvents.length == 0) return null;
	return upcomingEvents[0];
};

const fetchHome = async () => {
	const homePageQuery = defineQuery(`
		*[_type == 'homePage' && _id == "homePage"][0] {
			hero,
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
				image,
				subtitle,
				description,
			},
			hackerlab {
				location,
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

export const load: PageServerLoad = async () => {
	const [homepage, settings, nextEvent] = await Promise.all([
		fetchHome(),
		getSiteSettings(),
		fetchNextCalEvent()
	]);

	return { homepage, socials: settings.socials, nextEvent };
};
