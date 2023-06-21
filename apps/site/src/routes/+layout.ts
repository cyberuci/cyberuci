import type { LayoutLoad } from './$types';
import { SanityDocument } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import { z } from 'zod';
import groq from 'groq';

const Info = SanityDocument.extend({
	email: z.string().email(),
	socials: z.array(
		z.object({
			_key: z.string(),
			platform: z.string(),
			link: z.string()
		})
	)
}).nullable();

export type Info = z.infer<typeof Info>;

export const load = (async () => {
	const info = Info.safeParse(await client.fetch(groq`*[_id == "info"][0]`));

	if (info.success) {
		return { info: info.data };
	} else {
		return { info: null };
	}
}) satisfies LayoutLoad;
