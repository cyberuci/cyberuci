import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchNewsPageQuery = async () => {
	const newsPageQuery = defineQuery(`
		*[_type == "news"] | order(date desc) {
			_id,
			title,
			date,
			cover,
			source,
			link,
		}
  	`);

	const newsPage = await client.fetch(newsPageQuery);

	if (newsPage == null) {
		throw Error('News page data is null.');
	}

	return newsPage;
};

export const load: PageServerLoad = async () => {
	return {
		newsPage: await fetchNewsPageQuery()
	};
};
