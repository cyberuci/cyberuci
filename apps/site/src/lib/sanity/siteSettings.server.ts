import { dev } from '$app/environment';
import { defineQuery } from 'groq';
import { client } from '$lib/sanity/sanityClient';
import type { SiteNotice } from '$lib/common/notices';

export type { SiteNotice };

/**
 * Site-wide settings shown on every page (footer email, homepage socials, banners and pop-ups).
 */
const CACHE_TTL_MS = dev ? 0 : 5 * 60 * 1000;

export interface Social {
	_key: string;
	platform: string;
	link: string;
}

export interface SiteSettings {
	email: string | null;
	socials: Social[] | null;
	notices: SiteNotice[];
}

interface SiteSettingsQueryResult {
	email: string | null;
	socials: Social[] | null;
	siteNotices: { notices: SiteNotice[] | null } | null;
}

const siteSettingsQuery = defineQuery(`{
	"email": *[_type == "info" && _id == "info"][0].email,
	"socials": *[_type == "info" && _id == "info"][0].socials[] { _key, platform, link },
	"siteNotices": *[_type == "siteNotices" && _id == "siteNotices"][0] {
		"notices": notices[enabled == true] { _key, kind, message, link, icon, startsAt, endsAt }
	}
}`);

const fetchSiteSettings = async (): Promise<SiteSettings> => {
	const result = await client.fetch<SiteSettingsQueryResult>(siteSettingsQuery);

	return {
		email: result.email,
		socials: result.socials,
		notices: result.siteNotices?.notices ?? []
	};
};

let cached: { fetchedAt: number; settings: Promise<SiteSettings> } | null = null;

export const getSiteSettings = (): Promise<SiteSettings> => {
	if (!cached || Date.now() - cached.fetchedAt > CACHE_TTL_MS) {
		const settings = fetchSiteSettings().catch((error) => {
			cached = null;
			throw error;
		});
		cached = { fetchedAt: Date.now(), settings };
	}

	return cached.settings;
};
