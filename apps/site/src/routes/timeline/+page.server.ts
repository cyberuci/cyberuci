import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const achievementsPageQuery = defineQuery(`
		*[_type == "achievementsPage"][0] {
			description,
			achievements[] {
				_key,
				year,
				category->{ name, color },
				title,
				description,
				placing,
				image
			}
		}
	`);
	const achievementsPage = await client.fetch(achievementsPageQuery);

	if (achievementsPage === null) throw Error('Failed to load achievements page.');

	return { achievementsPage };
};
