export type NoticeKind = 'banner' | 'popup';
export type NoticeIcon = 'megaphone' | 'coins' | 'shirt';

export interface SiteNotice {
	_key: string;
	kind: NoticeKind;
	message: string;
	link: string | null;
	icon: NoticeIcon | null;

	// ISO datetimes, null = no limit
	startsAt: string | null;
	endsAt: string | null;
}

const toTime = (value: string | null) => (value ? new Date(value).getTime() : NaN);

export const isNoticeActive = (notice: SiteNotice, now: Date = new Date()) => {
	const time = now.getTime();
	const startsAt = toTime(notice.startsAt);
	const endsAt = toTime(notice.endsAt);

	if (!Number.isNaN(startsAt) && time < startsAt) return false;
	if (!Number.isNaN(endsAt) && time >= endsAt) return false;
	return Boolean(notice.message?.trim());
};

export const isExternalLink = (link: string) => /^https?:\/\//.test(link);
