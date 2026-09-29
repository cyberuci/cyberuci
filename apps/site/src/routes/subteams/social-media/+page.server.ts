import type { PageServerLoad } from './$types';
import { loadComingSoonPage } from '../comingSoon';

export const load: PageServerLoad = () =>
	loadComingSoonPage('socialMediaPage', {
		title: 'Social Media',
		intro:
			"The Social Media team runs Cyber@UCI's Instagram and TikTok (@cyberuci), creates shorts and reels to promote the club, and works with Graphics and Outreach to keep our media presence active."
	});
