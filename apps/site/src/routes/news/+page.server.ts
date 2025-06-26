import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const newsPageQuery = defineQuery(`
    *[_type == "news"] {
			title,
			slug,
			date,
		}
  `);
	const newsPage = await client.fetch(newsPageQuery);

	return { newsPage };
};
