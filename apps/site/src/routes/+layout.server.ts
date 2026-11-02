import type { LayoutServerLoad } from './$types';
import { getSiteSettings, type SiteNotice } from '$lib/sanity/siteSettings.server';

const FALLBACK_EMAIL = 'cyberclub@uci.edu';

const fallback = { email: FALLBACK_EMAIL, notices: [] as SiteNotice[] };

export const load: LayoutServerLoad = async ({ route, untrack }) => {
	// No route matched (ie. 404 or bots)
	if (untrack(() => route.id) === null) return fallback;

	try {
		const settings = await getSiteSettings();

		return {
			email: settings.email || FALLBACK_EMAIL,
			notices: settings.notices
		};
	} catch (error) {
		console.error('Failed to load site settings from Sanity', error);
		return fallback;
	}
};
