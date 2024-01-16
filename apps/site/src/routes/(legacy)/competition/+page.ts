import type { PageLoad } from './$types';
import { SanityDocument, Person } from '$lib/sanity/types';
import { client } from '$lib/sanity/sanityClient';
import groq from 'groq';
import { z } from 'zod';

const QueryResult = z.array(
	SanityDocument.merge(Person).pick({
		_id: true,
		image: true,
		name: true,
		pronouns: true,
		email: true
	})
);

export const load = (async () => {
	const query = groq`
		*[_type == "person" && _id in ["9bc2103e-a025-4ecf-8217-8264320f7cc6", "0087e2ca-fa5f-4dd5-bc03-12b0d882f5e6", "b7426047-ee66-489a-b056-95564f95846c", "aa74ff34-626f-42ea-9bc7-9501eadcc821"]]
  `;
	const leads = QueryResult.parse(await client.fetch(query));

	return { leads };
}) satisfies PageLoad;
