import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const fetchCorporatePage = async () => {
	const corporatePageQuery = defineQuery(`
		*[_type == "corporatePage" && _id == "corporatePage"][0] {
			sponsorshipPackage {
				file {
					asset-> { url }
				}
			},
			hero {
				label,
				headline,
				description
			},
			tiersDescription,
			additionalOpportunitiesDescription,
			about[] {
				_key,
				title,
				description
			},
			whySponsor[] {
				_key,
				title,
				description
			},
			clubEvents {
				description,
				events[] {
					_key,
					title,
					description,
					image
				}
			},
			tiers[] {
				_key,
				name,
				price,
				color,
				inheritedPerks,
				perks
			},
			achievements[] {
				_key,
				year,
				text
			},
			contacts[] {
				_key,
				label,
				value,
				href
			},
			additionalOpportunities[] {
				_key,
				title,
				description
			}
		}
	`);

	const corporatePage = await client.fetch(corporatePageQuery);

	if (corporatePage === null) {
		throw Error('Corporate page document is null.');
	}

	return corporatePage;
};

export const load: PageServerLoad = async () => {
	return { corporatePage: await fetchCorporatePage() };
};
