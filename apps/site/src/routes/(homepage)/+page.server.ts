import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchHome = async () => {
	const homePageQuery = defineQuery(`
		*[_type == 'homePage' && _id == "homePage"][0] {
			highlightNews {
				enable,
				article -> {
					title,
					cover,
					date,
				},
			},
			competitions {
				subtitle,
				description,
			},
			hackerlab {
				description,
				images,
			}
		}
  `);

	const homeData = await client.fetch(homePageQuery);

	if (homeData === null) {
		throw Error('Homepage document is null.');
	}

	return homeData;
};

const fetchSocials = async () => {
	const socialsQuery = defineQuery(`
		*[_type == 'info' && _id == "info"][0] {
			socials
		}
	`);

	const socialsData = await client.fetch(socialsQuery);

	if (socialsData === null) {
		throw Error('Socials document is null.');
	}

	return socialsData;
};

export const load: PageServerLoad = async () => {
	return {
		homepage: await fetchHome(),
		socials: await fetchSocials()
	};
};
