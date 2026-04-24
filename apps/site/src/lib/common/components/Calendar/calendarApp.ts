import { type CalendarEvent } from '$lib/common/components/Calendar/types';
import {
	createCalendar,
	createViewMonthGrid,
	type CalendarApp,
	type CalendarEventExternal
} from '@schedule-x/calendar';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { CalendarColors } from './constants';

export function showDescription(descriptionId: string, closeIfOpen: boolean) {
	const description = document.getElementById(descriptionId);

	if (description == null) return;

	if (closeIfOpen) {
		if (description.style.display == 'block') description.style.display = 'none';
		else description.style.display = 'block';
	} else {
		description.style.display = 'block';
	}
}

function scrollToEvent(event: CalendarEventExternal) {
	const largeScreenSize = 1024;

	const eventSide = document.getElementById(event.id + '_side_view');
	const eventDetails = document.getElementById('eventDetails');

	const eventDescription = document.getElementById(event.id + '_description');

	if (eventSide != null && eventDetails != null) {
		if (window.innerWidth >= largeScreenSize) {
			const targetPosition = eventSide.offsetTop - eventDetails.offsetTop;
			eventDetails.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		} else {
			window.scrollTo({
				top: eventSide.offsetTop - 10,
				behavior: 'smooth'
			});
		}

		if (eventDescription) showDescription(event.id + '_description', false);
	}
}

export function createApp(events: CalendarEvent[]): CalendarApp {
	const calendarControls = createCalendarControlsPlugin();

	// calendarControls.setMaxDate();
	console.log(Temporal.Now.plainDateISO());

	const calendarApp: CalendarApp = createCalendar(
		{
			views: [createViewMonthGrid()],
			calendars: CalendarColors,
			events: events,
			callbacks: {
				onEventClick(event) {
					scrollToEvent(event);
				}
			},
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
		},
		[calendarControls]
	);
	return calendarApp;
}
