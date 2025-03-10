import type { PageServerLoad } from './$types';
import { SanityImageReferenceWithAlt } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';
import z from 'zod';

const HomePageQueryResult = z.object({
	competitions: z.object({
		subtitle: z.string(),
		description: z.string()
	}),
	hackerlab: z.object({
		description: z.string(),
		images: z.array(SanityImageReferenceWithAlt)
	})
});

const SocialsQueryResult = z.object({
	socials: z.array(
		z.object({
			platform: z.string(),
			link: z.string()
		})
	)
});

export const load: PageServerLoad = async () => {
	const homePageQuery = groq`
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

	const socialsQuery = groq`
		*[_id == "info"][0] {
			socials
		}
	`;

	return {
		homepage: HomePageQueryResult.parse(await client.fetch(homePageQuery)),
		socials: SocialsQueryResult.parse(await client.fetch(socialsQuery))
	};
};
