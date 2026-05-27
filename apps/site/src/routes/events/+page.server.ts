import { _formatCalendarData } from '$lib/common/components/Calendar/calendarData';

export const load = async () => {
	const calendarData = await _formatCalendarData();

	return calendarData;
};
