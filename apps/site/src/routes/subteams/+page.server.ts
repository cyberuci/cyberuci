import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';
import z from 'zod';

const QueryResult = z.object({
	subteams: z.array(
		z.object({
			name: z.string(),
			description: z.string().nullable()
		})
	)
});

export const load: PageServerLoad = async () => {
	const query = groq`
    *[_type == "subteamsPage"][0] {
			subteams[] {
				name,
				description
			}
		}
  `;
	const subteams = await QueryResult.parseAsync(await client.fetch(query));

	return { subteams };
};
