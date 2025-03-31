import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const subteamPageQuery = defineQuery(`
    *[_type == "subteamsPage"][0] {
			subteams[] {
				name,
				description
			}
		}
  `);
	const subteams = await client.fetch(subteamPageQuery);

	return { subteams };
};
