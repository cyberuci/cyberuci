import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchNewsPageQuery = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	const newsStoryPageQuery = defineQuery(`
		*[_type == "news" && slug.current == $slug][0] {
			content,
			title,
			date,
			slug,
		}
	`);

	const newsStoryPage = await client.fetch(newsStoryPageQuery, {
		slug
	});

	if (newsStoryPage == null) {
		throw Error('News page data is null.');
	}

	return newsStoryPage;
};

const fetchExternalNewsLink = async ({ params }: { params: { newsArticleTitle: string } }) => {
	const { newsArticleTitle } = params;

	const externalNewsLinkQuery = defineQuery(`
   	*[_type == "newsLink" && title match $newsArticleTitle][0] {
			date,
			title,
			source,
			link,
		}
  	`);

	const externalNewsLink = await client.fetch(externalNewsLinkQuery, {
		newsArticleTitle
	});

	if (externalNewsLink == null) {
		throw Error('External news link data is null.');
	}

	return externalNewsLink;
};

const fetchRecentArticles = async () => {
	const newsPageRecentQuery = defineQuery(`
		*[_type == "news"] | order(date desc) [0...3] {
			_id,
			title,
			slug,
			date,
			cover,
		}
  `);
	const recentNewsPage = await client.fetch(newsPageRecentQuery);

	if (recentNewsPage == null) {
		throw Error('Recent news page data is null.');
	}

	return recentNewsPage;
};

const fetchRecentExternalLinkQuery = async () => {
	const recentExternalLinkQuery = defineQuery(`
		*[_type == "newsLink"] | order(date desc) [0...3] {
			date,
			title,
			source,
			link,
		}
  	`);

	const recentExternalLink = await client.fetch(recentExternalLinkQuery);

	if (recentExternalLink == null) {
		throw Error('Recent news page link is null.');
	}

	return recentExternalLink;
};

export const load: PageServerLoad = async ({ params: { slug } }) => {
	const newsStoryPage = await fetchNewsPageQuery({ params: { slug: slug } });
	const externalNewsLink = await fetchExternalNewsLink({
		params: { newsArticleTitle: newsStoryPage.title }
	});
	const recentArticles = await fetchRecentArticles();
	const recentExternalLink = await fetchRecentExternalLinkQuery();

	return {
		newsStoryPage,
		externalNewsLink,
		recentArticles,
		recentExternalLink
	};
};
