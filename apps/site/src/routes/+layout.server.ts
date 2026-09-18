import type { LayoutServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const FALLBACK_EMAIL = 'cyberclub@uci.edu';

interface SiteInfo {
	email: string | null;
	applicationAnnouncement: {
		enabled: boolean;
		opensAt: string;
		closesAt: string;
		link: string;
	} | null;
}

export const load: LayoutServerLoad = async () => {
	const infoQuery = defineQuery(`
		*[_type == "info" && _id == "info"][0] {
			email,
			applicationAnnouncement {
				enabled,
				opensAt,
				closesAt,
				link
			}
		}
	`);

	const info = await client.fetch<SiteInfo | null>(infoQuery);

	return {
		email: info?.email || FALLBACK_EMAIL,
		applicationAnnouncement: info?.applicationAnnouncement ?? null
	};
};
