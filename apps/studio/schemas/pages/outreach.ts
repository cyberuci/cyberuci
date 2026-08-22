import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'outreachPage',
	title: 'Outreach',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Page Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'Outreach'
		}),
		defineField({
			name: 'intro',
			title: 'Intro',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required(),
			initialValue:
				'The team responsible for every relationship Cyber@UCI has outside its own walls: sponsors, partner clubs, campus departments, and the wider community.'
		}),
		defineField({
			name: 'scanLog',
			title: 'Scan Log',
			type: 'object',
			fields: [
				defineField({
					name: 'header',
					title: 'Header',
					type: 'string',
					validation: (Rule) => Rule.required(),
					initialValue: 'outreach@cyberuci - scan.log'
				}),
				defineField({
					name: 'command',
					title: 'Command',
					type: 'string',
					validation: (Rule) => Rule.required(),
					initialValue: './scan --range=external'
				}),
				defineField({
					name: 'entries',
					title: 'Entries',
					type: 'array',
					of: [
						defineArrayMember({
							name: 'entry',
							title: 'Entry',
							type: 'object',
							fields: [
								defineField({
									name: 'time',
									title: 'Time',
									description: 'e.g. "0.42s"',
									type: 'string',
									validation: (Rule) => Rule.required()
								}),
								defineField({
									name: 'target',
									title: 'Target',
									description: 'e.g. "career.uci.edu"',
									type: 'string',
									validation: (Rule) => Rule.required()
								}),
								defineField({
									name: 'status',
									title: 'Status',
									type: 'string',
									validation: (Rule) => Rule.required()
								}),
								defineField({
									name: 'note',
									title: 'Note',
									type: 'string',
									validation: (Rule) => Rule.required()
								})
							],
							preview: {
								select: { title: 'target', subtitle: 'status' }
							}
						})
					],
					validation: (Rule) => Rule.required().min(1),
					initialValue: [
						{
							_key: 'entry1',
							time: '0.42s',
							target: 'career.uci.edu',
							status: 'host up',
							note: 'partnership active'
						},
						{
							_key: 'entry2',
							time: '0.88s',
							target: 'oit.uci.edu',
							status: 'host up',
							note: 'co-hosted [x] events'
						},
						{
							_key: 'entry3',
							time: '1.31s',
							target: 'sponsor:[sponsor]',
							status: 'port 443 open',
							note: '[what do they do?]'
						},
						{
							_key: 'entry4',
							time: '1.77s',
							target: 'sponsor:nuccinc.org',
							status: 'port 443 open',
							note: 'partnership'
						},
						{
							_key: 'entry5',
							time: '2.20s',
							target: 'uci.clubs',
							status: 'host up',
							note: 'joint workshops'
						},
						{
							_key: 'entry6',
							time: '2.65s',
							target: 'uci.faculty',
							status: 'host up',
							note: 'mentorship and support'
						}
					]
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'whatWeDo',
			title: 'What We Do',
			type: 'object',
			fields: [
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'string',
					validation: (Rule) => Rule.required(),
					initialValue: 'What We Do'
				}),
				defineField({
					name: 'symbol',
					title: 'Symbol',
					description:
						'Short glyph shown in brackets before the heading, e.g. "?". Defaults to "?".',
					type: 'string',
					initialValue: '?'
				}),
				defineField({
					name: 'body',
					title: 'Body',
					type: 'array',
					of: [defineArrayMember({ type: 'string' })],
					validation: (Rule) => Rule.required().min(1),
					initialValue: [
						"Our outreach subteam supports and facilitates the club's external relationships, whether if its with other clubs, campus organizations & staff, clubs from other colleges and universities, or companies. They work closely with our marketing subteams to support our club's branding and visibility, alongside developing sponsorship material for our outreach efforts.",
						'Every "host" in the log above is a relationship someone on the team is actively maintaining, not a one-time email, but an ongoing line of contact.'
					]
				}),
				defineField({
					name: 'image',
					title: 'Image',
					type: 'image',
					options: { hotspot: true },
					fields: [
						defineField({
							name: 'alt',
							title: 'Alternative Text',
							type: 'string',
							validation: (Rule) =>
								Rule.custom((alt, context) => {
									const parent = context.parent as { asset?: { _ref?: string } } | undefined;
									if (parent?.asset?._ref && !alt) {
										return 'You must provide alternative text for the image.';
									}
									return true;
								})
						})
					]
				}),
				defineField({
					name: 'imageSecondary',
					title: 'Second Image',
					type: 'image',
					options: { hotspot: true },
					fields: [
						defineField({
							name: 'alt',
							title: 'Alternative Text',
							type: 'string',
							validation: (Rule) =>
								Rule.custom((alt, context) => {
									const parent = context.parent as { asset?: { _ref?: string } } | undefined;
									if (parent?.asset?._ref && !alt) {
										return 'You must provide alternative text for the image.';
									}
									return true;
								})
						})
					]
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'focusAreas',
			title: 'Focus Areas',
			type: 'object',
			fields: [
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'string',
					validation: (Rule) => Rule.required(),
					initialValue: 'Focus Areas'
				}),
				defineField({
					name: 'symbol',
					title: 'Symbol',
					description:
						'Short glyph shown in brackets before the heading, e.g. "?". Defaults to "?".',
					type: 'string',
					initialValue: '?'
				}),
				defineField({
					name: 'areas',
					title: 'Areas',
					type: 'array',
					of: [
						defineArrayMember({
							name: 'area',
							title: 'Area',
							type: 'object',
							fields: [
								defineField({
									name: 'tag',
									title: 'Tag',
									type: 'string',
									validation: (Rule) => Rule.required()
								}),
								defineField({
									name: 'title',
									title: 'Title',
									type: 'string',
									validation: (Rule) => Rule.required()
								}),
								defineField({
									name: 'description',
									title: 'Description',
									type: 'text',
									rows: 2,
									validation: (Rule) => Rule.required()
								})
							],
							preview: {
								select: { title: 'title', subtitle: 'tag' }
							}
						})
					],
					validation: (Rule) => Rule.required().min(1),
					initialValue: [
						{ _key: 'area1', tag: 'SPONSOR', title: 'Company Partnerships', description: '[text]' },
						{ _key: 'area2', tag: 'CAMPUS', title: 'Campus partnerships', description: '[text]' },
						{
							_key: 'area3',
							tag: 'NETWORK',
							title: 'Inter-collegiate ties',
							description: '[text]'
						},
						{ _key: 'area4', tag: 'BRAND', title: 'Cross-team coordination', description: '[text]' }
					]
				})
			],
			validation: (Rule) => Rule.required()
		})
	],

	preview: {
		prepare() {
			return { title: 'Outreach Page' };
		}
	}
});
