import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const resourcesQuery = defineQuery(`
    *[_type == "resource"] {
      _id,
      title,
      description,
      notes,
      category,
      link,
      image {
        asset->{
          url
        },
        alt
      },
      tags
    }
  `);

	const resources = await client.fetch(resourcesQuery);

	return {
		resources
	};
};
