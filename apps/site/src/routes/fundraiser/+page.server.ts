import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fundraiserQuery = defineQuery(`
	*[_type == "fundraiserPage" && _id == "fundraiserPage"][0] {
		description,
		isMerch,
		poster {
			asset,
			alt
		}
	}
`);

export const load: PageServerLoad = async () => {
	const page = await client.fetch(fundraiserQuery);
	const poster = page?.poster?.asset ? page.poster : null;

	return { poster, description: page?.description ?? null, isMerch: page?.isMerch ?? null };
};
