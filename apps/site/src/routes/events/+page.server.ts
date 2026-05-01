import { GOOGLE_CALENDAR_API_KEY } from '$env/static/private';
import { type GoogleCalendarEvent } from '$lib/common/components/Calendar/types';
import { Temporal } from 'temporal-polyfill';

const BASE_URL = 'https://www.googleapis.com/calendar/v3/calendars/';

export const load = async () => {
	const CALENDAR_IDs = {
		CDCC: 'c_90c6de8b1a0ad2c1b355fee84568f69e1cd38e9a56be211c9e239758693eebe9@group.calendar.google.com',
		General:
			'c_4240ffad5958e508540f6dce6c0a24ade342731f13dd4ef986d62f1feba559a8@group.calendar.google.com',
		Networking:
			'c_06646e682d1489eae05bdc388992c574292532c2731849c8be626767e8d00463@group.calendar.google.com',
		Social:
			'c_66daac0c50ca306dce85ecddffcfc9f06aae0f460c4de84eb74c31197aba8aa3@group.calendar.google.com',
		CPTC: 'c_e1897d3d838edc5066edf565df753902b3d1dc92d6a805c2f5e7fc993c1d9e00@group.calendar.google.com',
		CTF: 'c_d6949f41289231733fb264a371fa59a473e8bed5ecb8fe5668ef768e804fffa0@group.calendar.google.com'
	};

	const now = Temporal.Now.plainDateISO();
	const oneYearAgo = now.subtract({ years: 1 });

	const parameters = {
		key: GOOGLE_CALENDAR_API_KEY,
		timeMin: `${oneYearAgo.toString()}T00:00:00Z`,
		singleEvents: 'true',
		orderBy: 'startTime'
	};

	const calendar_info: Record<string, GoogleCalendarEvent[]> = {};

	for (const [calendar_name, calendar_id] of Object.entries(CALENDAR_IDs)) {
		let url = BASE_URL + `${calendar_id}/events?`;

		for (const [name, value] of Object.entries(parameters)) url += `${name}=${value}&`;

		url = url.substring(0, url.length - 1);

		const response = await fetch(url);
		const data = await response.json();

		calendar_info[calendar_name] = data.items || [];
	}

	return { events: calendar_info || [] };
};
