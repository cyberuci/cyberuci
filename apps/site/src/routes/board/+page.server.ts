import type { PageServerLoad } from './$types';
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
		.transform(async (members) => {
			const ids = new Set<string>([]);
			// remove duplicates
			members.filter(({ person: { _id } }) => (ids.has(_id) ? false : !!ids.add(_id)));

			return members;
		})
});

export const load: PageServerLoad = async () => {
	const query = groq`
		{
			"year": *[_type == "board"] | order(year desc)[0].year,
			"members": *[_type == "board"] | order(year desc)[0].sections[].members[].person-> {
				"person": @,
				"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title
			}
		}
  `;
	const board = await QueryResult.parseAsync(await client.fetch(query));

	return { board };
};
