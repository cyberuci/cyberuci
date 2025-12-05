import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchNewsPageQuery = async () => {
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

	if (newsPage == null) {
		throw Error('News page data is null.');
	}

	return newsPage;
};

const fetchExternalNewsLink = async () => {
	const externalNewsLinkQuery = defineQuery(`
		*[_type == "newsLink"] | order(date desc) {
			date,
			title,
			source,
			link,
		}
  	`);

	const externalNewsLink = await client.fetch(externalNewsLinkQuery);

	if (externalNewsLink == null) {
		throw Error('External news link data is null.');
	}

	return externalNewsLink;
};

export const load: PageServerLoad = async () => {
	return {
		newsPage: await fetchNewsPageQuery(),
		externalNewsLink: await fetchExternalNewsLink()
	};
};
