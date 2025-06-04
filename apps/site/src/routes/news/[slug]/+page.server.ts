import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const newsStoryPageQuery = defineQuery(`
    *[_type == "news"][0] {
			content,
			title
		}
  `);
	const newsStoryPage = await client.fetch(newsStoryPageQuery);

	return { newsStoryPage };
};
