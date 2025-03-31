import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const boardPageQuery = defineQuery(`
		{
			"year": *[_type == "board"] | order(year desc)[0].year,
			"members": *[_type == "board"] | order(year desc)[0].sections[].members[].person-> {
				"person": @,
				"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title
			}
		}
  `);
	const board = await client.fetch(boardPageQuery);

	return { board };
};
