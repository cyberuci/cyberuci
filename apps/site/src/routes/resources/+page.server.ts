import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const resourcesQuery = defineQuery(`
    *[_type == "resourcecopy"] {
      _id,
      title,
      content,
      externalResource,
      category,
      link,
      thumbnail {
        asset->{
          url
        },
        alt,
        isLogo
      },
      tags
    }
  `);

	const resources = await client.fetch(resourcesQuery);

	return {
		resources
	};
};
