import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params: { slug } }) => {
	// get the content and external news link for the specific article
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

	const newsArticleTitle = newsStoryPage.title;

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

	// get the three most recent news articles and their external news link
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

	const recentExternalLinkQuery = defineQuery(`
		*[_type == "newsLink"] | order(date desc) [0...3] {
			date,
			title,
			source,
			link,
		}
  `);
	const recentExternalLink = await client.fetch(recentExternalLinkQuery);

	if (!newsStoryPage) {
		return error(404);
	}

	return { newsStoryPage, externalNewsLink, recentNewsPage, recentExternalLink };
};
