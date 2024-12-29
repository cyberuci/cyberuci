import type { PageServerLoad } from './$types';
import { Person } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import z from 'zod';
import asciify from 'asciify-image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

const getAsciiImage = async (url: SanityImageSource) => {
	return (await asciify(builder.image(url).width(64).height(64).sharpen(100).url(), {
		fit: 'none',
		width: 45,
		height: 55,
		color: false
	})) as string;
};

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

			return Promise.all(
				members.map(async (member) => {
					if (member.person.image) {
						return {
							...member,
							person: { ...member.person, ascii: await getAsciiImage(member.person.image) }
						};
					} else {
						return member;
					}
				})
			);
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
	const board = await QueryResult.parseAsync(await client.fetch(query));

	return { board };
}) satisfies PageServerLoad;
