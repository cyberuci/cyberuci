import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchBoard = async () => {
	const boardPageQuery = defineQuery(`
		{
			"year": *[_type == "board"] | order(year desc)[0].year,
			"members": *[_type == "board"] | order(year desc)[0].sections[].members[].person-> {
				"person": @,
				"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title
			}
		}
  `);
	const { year, members } = await client.fetch(boardPageQuery);

	if (year === null || members === null) {
		throw Error('Failed to retrieve current board year.');
	}

	return { year, members };
};

export const load: PageServerLoad = async () => {
	return { board: await fetchBoard() };
};
