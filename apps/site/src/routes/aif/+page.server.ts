import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchSocials = async () => {
	const socialsQuery = defineQuery(`
		*[_type == 'info' && _id == "info"][0] {
			socials
		}
	`);

	const socialsData = await client.fetch(socialsQuery);

	if (socialsData?.socials === null || socialsData?.socials === undefined) {
		throw Error('Socials document is null.');
	}

	return socialsData?.socials;
};

export const load: PageServerLoad = async () => {
	return {
		socials: await fetchSocials()
	};
};
