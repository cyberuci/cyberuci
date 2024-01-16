import type { PageLoad } from './$types';
import { Person } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';
import z from 'zod';

const QueryResult = z.object({
	year: z.number(),
	members: z
		.array(
			z.object({
				person: Person,
				titles: z.array(z.string())
			})
		)
		.transform((members) => {
			const ids = new Set<string>([]);
			return members.filter(({ person: { _id } }) => (ids.has(_id) ? false : !!ids.add(_id)));
		})
});

export const load = (async () => {
	const query = groq`
		{
			"year": *[_type == "board"] | order(year desc)[0].year,
			"members": *[_type == "board"] | order(year desc)[0].sections[].members[].person-> {
				"person": @,
				"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title
			}
		}
  `;
	const board = QueryResult.parse(await client.fetch(query));

	return { board };
}) satisfies PageLoad;
