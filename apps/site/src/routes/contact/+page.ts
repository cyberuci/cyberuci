import type { PageLoad } from './$types';
import type { Person } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';

export const load = (async () => {
	const query = groq`
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
  `;
	type QueryResult = {
		sections: {
			_key: string;
			title: string;
			description: string;
			contacts: (Pick<Person, '_id' | 'image' | 'name' | 'pronouns' | 'email'> & {
				titles: string[];
			})[];
		}[];
	};
	const contactPage = client.fetch<QueryResult>(query);

	return { contactPage };
}) satisfies PageLoad;
