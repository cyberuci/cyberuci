import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';
import { z } from 'zod';

// Sanity Portable Text schema
// should probably replace this explicit zod schema with something like GROQD
const CompetitionPageQueryResult = z.object({
	content: z.array(
		z.union([
			z.object({
				_key: z.string(),
				_type: z.literal('block'),
				children: z.array(
					z.object({
						_key: z.string(),
						_type: z.literal('span'),
						marks: z.array(z.string()),
						text: z.string()
					})
				),
				markDefs: z.array(
					z.object({ _key: z.string(), _type: z.literal('link'), href: z.string() })
				),
				style: z.string()
			}),
			z.object({
				_key: z.string(),
				_type: z.literal('achievements'),
				years: z.array(
					z.object({
						_key: z.string(),
						_type: z.literal('year'),
						achievements: z.array(
							z.object({
								_key: z.string(),
								_type: z.literal('achievement'),
								placing: z.string(),
								title: z.string()
							})
						),
						year: z.number()
					})
				)
			})
		])
	)
});

export const load: PageServerLoad = async () => {
	const query = groq`
    *[_type == "competitionPage"][0] {
			content
		}
  `;
	const competitionPage = CompetitionPageQueryResult.parse(await client.fetch(query));

	return { competitionPage };
};
