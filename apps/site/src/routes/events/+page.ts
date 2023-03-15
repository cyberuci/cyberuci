import type { PageLoad } from './$types';
import type { SanitySlug } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';

export const load = (async () => {
	const query = groq`
		*[_type == "event"] | order(start desc) {
			title,
			slug,
			start,
			end,
			location,
			description
		}
  `;
	type QueryResult = {
		title: string;
		slug: SanitySlug;
		start: string;
		end: string;
		location: string;
		description: string;
	}[];
	const events = client.fetch<QueryResult>(query);

	return { events };
}) satisfies PageLoad;
