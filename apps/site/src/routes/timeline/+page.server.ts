import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const achievementsPageQuery = defineQuery(`
		*[_type == "achievementsPage" && _id == "achievementsPage"][0] {
			description,
			years[] | order(year desc) {
				year,
				achievements[] | order(month desc) {
					_key,
					title,
					month,
					category->{ name, color },
					description,
					placing,
					image
				}
			}
		}
	`);
	const achievementsPage = await client.fetch(achievementsPageQuery);

	if (achievementsPage === null) throw Error('Failed to load achievements page.');

	return { achievementsPage };
};
