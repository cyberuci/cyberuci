export type NoticeKind = 'banner' | 'popup';
export type NoticeIcon = 'megaphone' | 'coins' | 'shirt';

export interface SiteNotice {
	_key: string;
	kind: NoticeKind;
	message: string;
	link: string | null;
	icon: NoticeIcon | null;

	// Calendar dates (YYYY-MM-DD), null = no limit
	startsAt: string | null;
	endsAt: string | null;
}

const PACIFIC_TIME_ZONE = 'America/Los_Angeles';

const toDateKey = (value: string | null) => value?.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? null;

/** YYYY-MM-DD in Pacific time, matching the dates editors pick in Sanity. */
const pacificDateKey = (now: Date) =>
	new Intl.DateTimeFormat('en-CA', {
		timeZone: PACIFIC_TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(now);

export const isNoticeActive = (notice: SiteNotice, now: Date = new Date()) => {
	const today = pacificDateKey(now);
	const startsAt = toDateKey(notice.startsAt);
	const endsAt = toDateKey(notice.endsAt);

	// Start date is inclusive. End date is inclusive as well: hide only after that date.
	if (startsAt && today < startsAt) return false;
	if (endsAt && today > endsAt) return false;
	return Boolean(notice.message?.trim());
};

export const isExternalLink = (link: string) => /^https?:\/\//.test(link);
