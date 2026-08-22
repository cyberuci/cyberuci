import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const outreachPageQuery = defineQuery(`
		*[_type == "outreachPage"][0] {
			_id,
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
					...,
					alt
				},
				imageSecondary {
					...,
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
	const outreach = await client.fetch(outreachPageQuery);

	if (outreach === null) throw Error('Failed to load outreach page.');

	return { outreach };
};
