import { type CalendarEvent } from '$lib/common/components/Calendar/types';
import { createCalendar, createViewMonthGrid, type CalendarApp } from '@schedule-x/calendar';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { CalendarColors } from './constants';

export function createApp(events: CalendarEvent[]): CalendarApp {
	const calendarControls = createCalendarControlsPlugin();
	const calendarApp: CalendarApp = createCalendar(
		{
			views: [createViewMonthGrid()],
			calendars: CalendarColors,
			events: events,
			callbacks: {
				onEventClick(event) {
					const largeScreenSize = 1024;

					const eventSide = document.getElementById(event.id + '_side_view');
					const eventDetails = document.getElementById('eventDetails');

					if (eventSide != null && eventDetails != null) {
						if (window.innerWidth >= largeScreenSize) {
							const targetPosition = eventSide.offsetTop - eventDetails.offsetTop;
							eventDetails.scrollTo({
								top: targetPosition,
								behavior: 'smooth'
							});
						} else
							window.scrollTo({
								top: eventSide.offsetTop - 10,
								behavior: 'smooth'
							});
					}
				}
			},
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
		},
		[calendarControls]
	);
	return calendarApp;
}
