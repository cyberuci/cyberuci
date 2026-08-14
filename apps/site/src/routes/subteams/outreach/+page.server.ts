import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchOutreachPage = async () => {
	const outreachPageQuery = defineQuery(`
		*[_type == "outreachPage" && _id == "outreachPage"][0] {
			title,
			intro,
			scanLog {
				header,
				command,
				entries[] {
					_key,
					time,
					target,
					status,
					note
				}
			},
			whatWeDo {
				heading,
				symbol,
				body,
				image {
					asset-> { url },
					alt
				}
			},
			focusAreas {
				heading,
				symbol,
				areas[] {
					_key,
					tag,
					title,
					description
				}
			}
		}
	`);

	const outreachPage = await client.fetch(outreachPageQuery);

	if (outreachPage === null) {
		throw Error('Outreach page document is null.');
	}

	return outreachPage;
};

export const load: PageServerLoad = async () => {
	return { outreachPage: await fetchOutreachPage() };
};
