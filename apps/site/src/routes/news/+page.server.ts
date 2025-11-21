import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const newsPageQuery = defineQuery(`
		*[_type == "news"] | order(date desc) {
			_id,
			title,
			slug,
			date,
			cover,
		}
  `);
	const newsPage = await client.fetch(newsPageQuery);

	const externalNewsLinkQuery = defineQuery(`
		*[_type == "newsLink"] | order(date desc) {
			date,
			title,
			source,
			link,
		}
  `);
	const externalNewsLink = await client.fetch(externalNewsLinkQuery);

	return { newsPage, externalNewsLink };
};
