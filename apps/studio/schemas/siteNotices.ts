import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Site-wide banners (above the navigation) and pop-ups (bottom-right corner).
 */
export default defineType({
	name: 'siteNotices',
	title: 'Site Notices',
	type: 'document',
	fields: [
		defineField({
			name: 'notices',
			title: 'Notices',
			description:
				'Banners show above the navigation on every page. Pop-up shows in the bottom-right corner. Changes can take up to 5 minutes to appear on the site.',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'notice',
					title: 'Notice',
					type: 'object',
					initialValue: { enabled: true, kind: 'banner' },
					fields: [
						defineField({
							name: 'enabled',
							title: 'Enabled',
							type: 'boolean',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'kind',
							title: 'Type',
							type: 'string',
							options: {
								list: [
									{ title: 'Banner (top of every page)', value: 'banner' },
									{ title: 'Pop-up (bottom-right corner)', value: 'popup' }
								],
								layout: 'radio'
							},
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'message',
							title: 'Message',
							description: 'e.g. "Subteam applications are open until Oct 15. Apply now"',
							type: 'string',
							validation: (Rule) => Rule.required().max(140)
						}),
						defineField({
							name: 'link',
							title: 'Link',
							description: 'Optional. A full URL (https://…) or site path (/fundraiser)',
							type: 'url',
							validation: (Rule) => Rule.uri({ scheme: ['http', 'https'], allowRelative: true })
						}),
						defineField({
							name: 'icon',
							title: 'Pop-up icon',
							type: 'string',
							options: {
								list: [
									{ title: 'Megaphone', value: 'megaphone' },
									{ title: 'Coins (fundraiser)', value: 'coins' },
									{ title: 'Shirt (merch)', value: 'shirt' }
								]
							},
							hidden: ({ parent }) => parent?.kind !== 'popup'
						}),
						defineField({
							name: 'startsAt',
							title: 'Show from',
							description:
								'Optional. Leave empty to show immediately. The notice appears on this date.',
							type: 'date'
						}),
						defineField({
							name: 'endsAt',
							title: 'Hide after',
							description:
								'Optional. Leave empty to keep showing until disabled. The notice stays up through this date.',
							type: 'date',
							validation: (Rule) =>
								Rule.custom((endsAt, context) => {
									const parent = context.parent as { startsAt?: string } | undefined;
									if (!endsAt || !parent?.startsAt) return true;

									const end = String(endsAt).slice(0, 10);
									const start = String(parent.startsAt).slice(0, 10);
									return end >= start ? true : '"Hide after" must be on or after "Show from".';
								})
						})
					],
					preview: {
						select: { title: 'message', kind: 'kind', enabled: 'enabled', endsAt: 'endsAt' },
						prepare({ title, kind, enabled, endsAt }) {
							const parts = [kind === 'popup' ? 'Pop-up' : 'Banner'];
							if (!enabled) parts.push('disabled');
							if (endsAt) {
								const [year, month, day] = String(endsAt).slice(0, 10).split('-').map(Number);
								const label =
									year && month && day
										? new Date(year, month - 1, day).toLocaleDateString()
										: String(endsAt);
								parts.push(`until ${label}`);
							}
							return { title, subtitle: parts.join(' · ') };
						}
					}
				})
			]
		})
	],
	preview: {
		prepare() {
			return { title: 'Site Notices' };
		}
	}
});
