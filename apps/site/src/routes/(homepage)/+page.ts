import type { PageLoad } from './$types';
import { SanityImageReferenceWithAlt } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';
import z from 'zod';

const QueryResult = z.object({
	competitions: z.object({
		subtitle: z.string(),
		description: z.string()
	}),
	hackerlab: z.object({
		description: z.string(),
		images: z.array(SanityImageReferenceWithAlt)
	})
});

export const load = (async () => {
	const query = groq`
		*[_id == "homePage"][0] {
			competitions {
				subtitle,
				description,
			},
			hackerlab {
				description,
				images,
			}
		}
  `;
	const homepage = QueryResult.parse(await client.fetch(query));

	return { homepage };
}) satisfies PageLoad;
