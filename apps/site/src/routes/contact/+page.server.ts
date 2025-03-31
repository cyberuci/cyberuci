import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const contactPageQuery = defineQuery(`
    *[_type == "contactPage"][0] {
			sections[] {
				_key,
				title,
				description,
				contacts[]-> {
					_id,
					image,
					name,
					pronouns,
					email,
					"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title
				}
			}
		}
  `);
	const contactPage = await client.fetch(contactPageQuery);

	return { contactPage };
};
