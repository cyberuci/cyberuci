import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const competitionPageQuery = defineQuery(`
    *[_type == "competitionPage"][0] {
			content
		}
  `);
	const competitionPage = await client.fetch(competitionPageQuery);

	return { competitionPage };
};
