import type { PageLoad } from './$types';
import type { Person } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';

export const load = (async () => {
	const query = groq`
    *[_type == "board"] | order(year desc)[0] {
      year,
			sections[] {
				label,
				members[] {
					title,
					terms,
					person->
				}
      }
    }
  `;
	type QueryResult = {
		year: number;
		sections: {
			label: string;
			members: {
				title: string;
				terms: string[];
				person: Person;
			}[];
		}[];
	};
	const board = client.fetch<QueryResult>(query);

	return { board };
}) satisfies PageLoad;
