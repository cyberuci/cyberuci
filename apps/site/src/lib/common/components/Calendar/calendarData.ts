import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

import { GOOGLE_CALENDAR_API_KEY } from '$app/env/private';
import { type GoogleCalendarEvent } from '$lib/common/components/Calendar/types';
import { Temporal } from 'temporal-polyfill';
import 'temporal-polyfill/global';
import { type CalendarType } from '@schedule-x/calendar';

const BASE_URL = 'https://www.googleapis.com/calendar/v3/calendars/';

const getCalendarInfo = async () => {
	const calendarDataQuery = defineQuery(`
    	*[_type == "calendar"] {
			title,
			calendarLink,
			backgroundColor,
			supportingColor,
			textColor
		}
  `);

	return await client.fetch(calendarDataQuery);
};

export const _formatCalendarData = async () => {
	const calendars = (await getCalendarInfo()) ?? [];

	const now = Temporal.Now.plainDateISO();
	const oneYearAgo = now.subtract({ years: 1 });

	const parameters = {
		key: GOOGLE_CALENDAR_API_KEY,
		timeMin: `${oneYearAgo.toString()}T00:00:00Z`,
		singleEvents: 'true',
		orderBy: 'startTime'
	};

	const items = await Promise.all(
		calendars.map(async (calendar) => {
			let url = BASE_URL + `${calendar.calendarLink}/events?`;

			for (const [name, value] of Object.entries(parameters)) url += `${name}=${value}&`;

			url = url.substring(0, url.length - 1);

			const response = await fetch(url);
			const data = await response.json();

			return (data.items || []) as GoogleCalendarEvent[];
		})
	);

	const calendarInfo: Record<string, GoogleCalendarEvent[]> = {};
	const calendarColors: Record<string, CalendarType> = {};

	calendars.forEach((calendar, i) => {
		calendarInfo[calendar.title] = items[i];
		calendarColors[calendar.title] = {
			colorName: calendar.title,
			lightColors: {
				main: calendar.backgroundColor.hex ?? '#000000',
				container: calendar.supportingColor.hex ?? '#000000',
				onContainer: calendar.textColor.hex ?? '#000000'
			}
		};
	});

	return { events: calendarInfo, colors: calendarColors || [] };
};
