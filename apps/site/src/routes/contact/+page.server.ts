import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Contact page is gone — club email lives in the footer now
export const load: PageServerLoad = async () => {
	redirect(301, '/');
};
