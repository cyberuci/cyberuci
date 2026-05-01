import { type CalendarType } from '@schedule-x/calendar';

export const CalendarColors: Record<string, CalendarType> = {
	General: {
		colorName: 'General',
		lightColors: {
			main: '#0016ba',
			container: '#82c3ff',
			onContainer: '#000000'
		}
	},
	CTF: {
		colorName: 'CTF',
		lightColors: {
			main: '#13c700',
			container: '#daffd6',
			onContainer: '#000000'
		}
	},
	CPTC: {
		colorName: 'CPTC',
		lightColors: {
			main: '#ffb400',
			container: '#fff3d6',
			onContainer: '#000000'
		}
	},
	CDCC: {
		colorName: 'CDCC',
		lightColors: {
			main: '#2231ff',
			container: '#b4adff',
			onContainer: '#000000'
		}
	},
	Networking: {
		colorName: 'Networking',
		lightColors: {
			main: '#ff005d',
			container: '#ffbcbc',
			onContainer: '#000000'
		}
	},
	Social: {
		colorName: 'Social',
		lightColors: {
			main: '#00afbf',
			container: '#9ff9ff',
			onContainer: '#000000'
		}
	}
} as const;
