import { type CalendarEvent } from '$lib/common/components/Calendar/types';
import {
	createCalendar,
	createViewMonthGrid,
	type CalendarApp,
	type CalendarEventExternal
} from '@schedule-x/calendar';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { type CalendarType } from '@schedule-x/calendar';

const LARGE_SCREEN_SIZE = 1024;
const SCROLL_OFFSET = 10;

function closeDescription(event: HTMLElement) {
	setTimeout(() => {
		event.style.transition = 'height 0.5s ease';
		event.style.height = 0 + 'px';
	}, 10);
}

function openDescription(event: HTMLElement) {
	const eventHeight = event.scrollHeight;

	setTimeout(() => {
		event.style.transition = 'height 0.5s ease';
		event.style.height = eventHeight + 'px';
	}, 10);
}

function closeAllEvents(eachEventDetail: HTMLCollection | undefined) {
	if (!eachEventDetail) return;

	for (const event of eachEventDetail) {
		const eventDescription = document.getElementById(
			event.id.replaceAll('_side_view', '_description')
		);
		if (eventDescription) closeDescription(eventDescription);
	}
}

export function showDescription(descriptionId: string, closeIfOpen: boolean) {
	const currEventDescription = document.getElementById(descriptionId);
	const allEvents = document.getElementById('eventDetails')?.children;

	closeAllEvents(allEvents);

	if (currEventDescription == null) return;

	if (closeIfOpen) {
		if (currEventDescription.style.height == '' || currEventDescription.style.height == '0px') {
			openDescription(currEventDescription);
		} else closeDescription(currEventDescription);
	} else {
		openDescription(currEventDescription);
	}
}

function getTargetPosition(
	event: HTMLElement,
	allEventDetails: HTMLElement
): [number, Window | HTMLElement] {
	let targetPosition;
	let container;

	if (window.innerWidth >= LARGE_SCREEN_SIZE) {
		container = allEventDetails;
		targetPosition = event.offsetTop - allEventDetails.offsetTop - SCROLL_OFFSET;
	} else {
		container = window;
		targetPosition = event.offsetTop - SCROLL_OFFSET;
	}

	return [targetPosition, container];
}

function scrollEventIntoView(event: HTMLElement, allEventDetails: HTMLElement) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			const [targetPosition, container] = getTargetPosition(event, allEventDetails);

			requestAnimationFrame(() => {
				container.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			});

			const handleTransitionEnd = () => {
				event.removeEventListener('scrollend', handleTransitionEnd);
				resolve();
			};

			container.addEventListener('scrollend', handleTransitionEnd);
		}, 10);
	});
}

async function scrollToEvent(event: CalendarEventExternal) {
	const specificEvent = document.getElementById(event.id + '_side_view');
	const allEventDetails = document.getElementById('eventDetails');

	if (specificEvent != null && allEventDetails != null) {
		await scrollEventIntoView(specificEvent, allEventDetails);
		await showDescription(event.id + '_description', false);
	}
}

export function createApp(
	events: CalendarEvent[],
	colors: Record<string, CalendarType>
): CalendarApp {
	const calendarControls = createCalendarControlsPlugin();

	const calendarApp: CalendarApp = createCalendar(
		{
			views: [createViewMonthGrid()],
			calendars: colors,
			events: events,
			callbacks: {
				onEventClick(event) {
					scrollToEvent(event);
				}
			},
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			firstDayOfWeek: 7
		},
		[calendarControls]
	);
	return calendarApp;
}
