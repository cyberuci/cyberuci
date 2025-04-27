import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchBoard = async () => {
	const boardPageQuery = defineQuery(`
		*[_type == "board"] | order(year desc) {
			"year": @.year,
			"members": @.sections[].members[].person-> {
				"person": @,
				"titles": ^.sections[].members[person._ref match ^._id].title
			}
		}
  `);

	return await client.fetch(boardPageQuery);
};

export const load: PageServerLoad = async () => {
	return { board: await fetchBoard() };
};
