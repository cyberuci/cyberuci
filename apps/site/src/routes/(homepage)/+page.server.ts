import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';
import { _formatCalendarData } from '$lib/common/components/Calendar/calendarData';

import { loadAllCalendars } from '$lib/common/components/Calendar/transform';

const fetchNextCalEvent = async () => {
	const calendarEvent = await _formatCalendarData();
	const allCalendars = loadAllCalendars(calendarEvent.events);
	return allCalendars[allCalendars.length - 1];
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

	console.log(homeData);

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
