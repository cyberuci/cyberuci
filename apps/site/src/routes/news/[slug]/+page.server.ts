import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params: { slug } }) => {
	const newsStoryPageQuery = defineQuery(`
   	*[_type == "news" && slug.current == $slug][0] {
			content,
			title
		}
  `);

	const newsStoryPage = await client.fetch(newsStoryPageQuery, {
		slug
	});

	const newsPageRecentQuery = defineQuery(`
		*[_type == "news"] | order(date desc) [0...4] {
			_id,
			title,
			slug,
			date,
			cover,
		}
  `);
	const newsPage = await client.fetch(newsPageRecentQuery);

	if (!newsStoryPage) {
		return error(404);
	}

	return { newsStoryPage, newsPage };
};
