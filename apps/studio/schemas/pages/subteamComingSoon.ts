import { defineField, defineType } from 'sanity';

interface ComingSoonPageOptions {
	name: string;
	title: string;
	intro: string;
}

function defineComingSoonPage({ name, title, intro }: ComingSoonPageOptions) {
	return defineType({
		name,
		title,
		type: 'document',
		fields: [
			defineField({
				name: 'title',
				title: 'Page Title',
				type: 'string',
				validation: (Rule) => Rule.required(),
				initialValue: title
			}),
			defineField({
				name: 'intro',
				title: 'Intro',
				description: 'Short description shown under the page title.',
				type: 'text',
				rows: 3,
				validation: (Rule) => Rule.required(),
				initialValue: intro
			}),
			defineField({
				name: 'comingSoon',
				title: 'Coming Soon Message',
				type: 'text',
				rows: 2,
				validation: (Rule) => Rule.required(),
				initialValue: 'This page is under development. Check back soon!'
			})
		],

		preview: {
			prepare() {
				return { title: `${title} Page` };
			}
		}
	});
}

export const webPage = defineComingSoonPage({
	name: 'webPage',
	title: 'Web',
	intro:
		'The Web team builds and maintains cyberuci.com, working with every other subteam to keep our competition results, news, leadership, and sponsor information up to date.'
});

export const socialMediaPage = defineComingSoonPage({
	name: 'socialMediaPage',
	title: 'Social Media',
	intro:
		"The Social Media team runs Cyber@UCI's Instagram and TikTok (@cyberuci), creates shorts and reels to promote the club, and works with Graphics and Outreach to keep our media presence active."
});

export const infrastructurePage = defineComingSoonPage({
	name: 'infrastructurePage',
	title: 'Infrastructure',
	intro:
		"The Infrastructure team runs Cyber@UCI's technical operations: the hardware in our ISEB 1550 lab, practice environments for our competition teams, hands-on workshop demos, and internal club tools."
});
