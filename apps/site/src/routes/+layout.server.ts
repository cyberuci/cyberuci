import type { LayoutServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const FALLBACK_EMAIL = 'cyberclub@uci.edu';

export const load: LayoutServerLoad = async () => {
	const infoQuery = defineQuery(`
		*[_type == "info" && _id == "info"][0] {
			email
		}
	`);

	const info = await client.fetch<{ email: string | null } | null>(infoQuery);

	return {
		email: info?.email || FALLBACK_EMAIL
	};
};
