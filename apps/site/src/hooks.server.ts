import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

/**
 * Default cache policy for successful GET responses that don't set their own.
 * The Cloudflare adapter stores responses with s-maxage in the edge cache, so most visits
 * are served without running any loads (and without querying Sanity).
 * Browser caches for 1 minute, edge caches for 5 minutes.
 */
const DEFAULT_CACHE_CONTROL = 'public, max-age=60, s-maxage=300';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (
		!dev &&
		event.request.method === 'GET' &&
		response.status === 200 &&
		!response.headers.has('cache-control') &&
		!response.headers.has('set-cookie')
	) {
		response.headers.set('cache-control', DEFAULT_CACHE_CONTROL);
	}

	return response;
};
