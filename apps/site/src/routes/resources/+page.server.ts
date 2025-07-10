import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const resourceQuery = defineQuery(`
		*[_type == "resources"] {
			title,
			// Add other fields you defined in the schema here
		}
	`);
	const resources = await client.fetch(resourceQuery);

	return { resources };
};
