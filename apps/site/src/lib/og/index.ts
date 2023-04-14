import { dev } from '$app/environment';
import { PUBLIC_OG_BASE_URL } from '$env/static/public';

export const base = dev ? 'http://localhost:3000' : PUBLIC_OG_BASE_URL;
