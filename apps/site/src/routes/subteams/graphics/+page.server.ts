import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const graphicsPageQuery = defineQuery(`
        *[_type == "graphicsPage"][0] {
            _id,
            title,
            intro,
            tasks,
            spotlight
        }
  `);
	const graphics = await client.fetch(graphicsPageQuery);

	if (graphics === null) throw Error('Failed to load graphics page.');

	console.log(graphics);

	return { graphics };
};
