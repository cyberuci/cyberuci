import type { PageLoad } from './$types';
import type { PortableTextBlock } from '@portabletext/types';
import type { SanitySlug } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';

export const load = (async ({ params }) => {
	const { slug } = params;

	const query = groq`
		*[_type == "event" && slug.current == $slug][0] {
			title,
			start,
			end,
			location,
			description,
			image,
			content[] {
				_type == 'pdf' => {
					...@,
					"fileUrl": file.asset->url
				},
				_type != 'pdf' => @
			}
		}
  `;
	type QueryResult = {
		title: string;
		slug: SanitySlug;
		start: string;
		end: string;
		location: string;
		description: string;
		content: PortableTextBlock[];
	};
	const event = client.fetch<QueryResult>(query, { slug });

	return { event };
}) satisfies PageLoad;
