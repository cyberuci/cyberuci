import type { PageServerLoad } from './$types';
import { loadComingSoonPage } from '../comingSoon';

export const load: PageServerLoad = () =>
	loadComingSoonPage('webPage', {
		title: 'Web',
		intro:
			'The Web team builds and maintains cyberuci.com, working with every other subteam to keep our competition results, news, leadership, and sponsor information up to date.'
	});
