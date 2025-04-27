import { dev } from '$app/environment';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';
import { SANITY_TOKEN } from '$env/static/private';
import { createClient } from '@sanity/client';

const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2023-03-13',
	token: SANITY_TOKEN,
	useCdn: !dev,
	perspective: 'drafts'
});

export { client };
