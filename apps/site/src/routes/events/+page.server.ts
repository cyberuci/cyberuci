import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

import { GOOGLE_CALENDAR_API_KEY } from '$env/static/private';
import { type GoogleCalendarEvent } from '$lib/common/components/Calendar/types';
import { Temporal } from 'temporal-polyfill';
import { type CalendarType } from '@schedule-x/calendar';

const BASE_URL = 'https://www.googleapis.com/calendar/v3/calendars/';

interface Color {
	_type: string;
	alpha: number;
	hex: string;
	hsl: object;
	hsv: object;
}

interface CalendarInfo {
	title: string;
	calendarLink: string;
	backgroundColor: Color;
	supportingColor: Color;
	textColor: Color;
}

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
	const calendarData = await client.fetch(calendarDataQuery);

	return { calendarData };
};

export const load = async () => {
	const CALENDAR_INFO: Record<string, CalendarInfo[]> = await getCalendarInfo();

	const now = Temporal.Now.plainDateISO();
	const oneYearAgo = now.subtract({ years: 1 });

	const parameters = {
		key: GOOGLE_CALENDAR_API_KEY,
		timeMin: `${oneYearAgo.toString()}T00:00:00Z`,
		singleEvents: 'true',
		orderBy: 'startTime'
	};

	const calendarInfo: Record<string, GoogleCalendarEvent[]> = {};
	const calendarColors: Record<string, CalendarType> = {};

	console.log(CALENDAR_INFO);

	for (const [_, calendar] of Object.entries(CALENDAR_INFO['calendarData'])) {
		console.log(_);

		let url = BASE_URL + `${calendar.calendarLink}/events?`;

		for (const [name, value] of Object.entries(parameters)) url += `${name}=${value}&`;

		url = url.substring(0, url.length - 1);

		const response = await fetch(url);
		const data = await response.json();

		calendarInfo[calendar.title] = data.items || [];
		calendarColors[calendar.title] = {
			colorName: calendar.title,
			lightColors: {
				main: calendar.backgroundColor.hex,
				container: calendar.supportingColor.hex,
				onContainer: calendar.textColor.hex
			}
		};
	}

	return { events: calendarInfo, colors: calendarColors || [] };
};
