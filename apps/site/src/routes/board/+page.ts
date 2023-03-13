import type { PageLoad } from './$types';
import type { Person } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';

export const load = (async () => {
	const query = groq`
    *[_type == "board"] | order(year desc) {
      year,
      members[]{
        title,
        terms,
        person->
      }
    }
  `;
	type QueryResult = {
		year: number;
		members: {
			title: string;
			terms: string[];
			person: Person;
		}[];
	}[];
	const boards = client.fetch<QueryResult>(query);

	return { boards };
}) satisfies PageLoad;
