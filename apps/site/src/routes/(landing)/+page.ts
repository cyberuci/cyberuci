import type { PageLoad } from './$types';
import { z } from 'zod';
import { SanityDocument, SanityImageReference } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';

export const load = (async () => {
	const query = groq`*[_type == "landingPage"][0]`;

	const LandingPage = SanityDocument.extend({
		_type: z.literal('landingPage'),
		cover: SanityImageReference
	});

	const landing = LandingPage.parse(await client.fetch(query));

	return { landing };
}) satisfies PageLoad;
