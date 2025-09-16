import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchSponsor = async () => {
	const sponsorQuery = defineQuery(`
		*[_type == "sponsor"] {
			_id,
			since,
			tier,
			name,
			logo {
				asset->{
					url
				},
				alt
			},
			logoDark {
				asset->{
					url
				}
			},
			note
		}
  `);

	return await client.fetch(sponsorQuery);
};

export const load: PageServerLoad = async () => {
	return { sponsors: Object.groupBy(await fetchSponsor(), ({ tier }) => tier) };
};
