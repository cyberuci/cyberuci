import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchBoard = async () => {
	const alumniPageQuery = defineQuery(`
        *[_type == "alumni"] {
            _id,
            personal,
            currentRole,
            cyberUCI,
            quote
        }
  `);

	return await client.fetch(alumniPageQuery);
};

export const load: PageServerLoad = async () => {
	console.log(await fetchBoard());
	return { alumni: await fetchBoard() };
};
