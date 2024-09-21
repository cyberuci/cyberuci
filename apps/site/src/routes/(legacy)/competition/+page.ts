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
		*[_type == "person" && _id in ["eb5e79ce-fe1e-480c-b623-3c8a5650986b", "07851b47-20b5-40e9-bddb-8622b273b1d5"]]
  `;
	const leads = QueryResult.parse(await client.fetch(query));

	return { leads };
}) satisfies PageLoad;
