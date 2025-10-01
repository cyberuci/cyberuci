import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const newsPageQuery = defineQuery(`
		*[_type == "news"] | order(date desc) {
			title,
			slug,
			date,
			cover,
		}
  `);
	const newsPage = await client.fetch(newsPageQuery);

	return { newsPage };
};
