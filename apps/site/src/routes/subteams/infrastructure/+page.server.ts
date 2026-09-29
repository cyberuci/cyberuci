import type { PageServerLoad } from './$types';
import { loadComingSoonPage } from '../comingSoon';

export const load: PageServerLoad = () =>
	loadComingSoonPage('infrastructurePage', {
		title: 'Infrastructure',
		intro:
			"The Infrastructure team runs Cyber@UCI's technical operations: the hardware in our ISEB 1550 lab, practice environments for our competition teams, hands-on workshop demos, and internal club tools."
	});
