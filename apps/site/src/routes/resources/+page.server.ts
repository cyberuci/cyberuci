import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
  const resourcePageQuery = defineQuery(`
    *[_type == "resources"][0] {
      title,
      resources[]{
        _key,
        title,
        description,
        category,
        link,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        tags
      }
    }
  `);

  const resourcePage = await client.fetch(resourcePageQuery);

  return {
    pageTitle: resourcePage?.title || 'Resources',
    resources: resourcePage?.resources || []
  };
};
