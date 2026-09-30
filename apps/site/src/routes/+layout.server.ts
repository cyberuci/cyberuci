import type { LayoutServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

const FALLBACK_EMAIL = 'cyberclub@uci.edu';

interface SiteInfo {
	email: string | null;
	description: string;
	applicationAnnouncement: {
		enabled: boolean;
		opensAt: string;
		closesAt: string;
		link: string;
	} | null;
}

interface FundraiserPromo {
	title: string | null;
	startDate: string | null;
	endDate: string | null;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Calendar day in Pacific time, as YYYY-MM-DD. */
const pacificToday = (now = new Date()) => {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Los_Angeles',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).formatToParts(now);

	const value = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value;

	return `${value('year')}-${value('month')}-${value('day')}`;
};

const activeFundraiserTitle = (promo: FundraiserPromo | null) => {
	const title = promo?.title?.trim();
	const startDate = promo?.startDate;
	const endDate = promo?.endDate;

	if (!title || !startDate || !endDate) return null;
	if (!ISO_DATE.test(startDate) || !ISO_DATE.test(endDate) || endDate < startDate) return null;

	const today = pacificToday();
	return startDate <= today && today <= endDate ? title : null;
};

export const load: LayoutServerLoad = async () => {
	const infoQuery = defineQuery(`
		*[_type == "info" && _id == "info"][0] {
			email,
			applicationAnnouncement {
				enabled,
				opensAt,
				closesAt,
				link
			}
		}
	`);

	const fundraiserPromoQuery = defineQuery(`
		*[_type == "fundraiserPage" && _id == "fundraiserPage"][0] {
			title,
			startDate,
			endDate
		}
	`);

	const [info, fundraiser] = await Promise.all([
		client.fetch<SiteInfo | null>(infoQuery),
		client.fetch<FundraiserPromo | null>(fundraiserPromoQuery)
	]);

	const fundraiserTitle = activeFundraiserTitle(fundraiser);

	return {
		email: info?.email || FALLBACK_EMAIL,
		applicationAnnouncement: info?.applicationAnnouncement ?? null,
		fundraiserTitle
	};
};
