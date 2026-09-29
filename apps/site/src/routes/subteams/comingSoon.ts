import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

interface ComingSoonDefaults {
	title: string;
	intro: string;
}

const comingSoonPageQuery = defineQuery(`
	*[_type == $type][0] {
		title,
		intro,
		comingSoon
	}
`);

// Falls back to defaults so the page still renders before its Sanity document is published.
export async function loadComingSoonPage(type: string, defaults: ComingSoonDefaults) {
	const page = await client.fetch(comingSoonPageQuery, { type });

	return {
		title: page?.title ?? defaults.title,
		intro: page?.intro ?? defaults.intro,
		comingSoon: page?.comingSoon ?? undefined
	};
}
