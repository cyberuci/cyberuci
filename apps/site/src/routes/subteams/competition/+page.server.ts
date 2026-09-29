import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const competitionTeamsPageQuery = defineQuery(`
		*[_type == "competitionTeamsPage"][0] {
			title,
			teams[] {
				_key,
				name,
				fullName,
				description
			},
			comingSoon
		}
	`);
	const page = await client.fetch(competitionTeamsPageQuery);

	return {
		title: page?.title ?? 'Competition Teams',
		teams: page?.teams ?? [],
		comingSoon: page?.comingSoon ?? undefined
	};
};
