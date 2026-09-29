import { defineArrayMember, defineField, defineType } from 'sanity';

const formattedText = defineArrayMember({
	type: 'block',
	styles: [{ title: 'Normal', value: 'normal' }],
	lists: [
		{ title: 'Bullet', value: 'bullet' },
		{ title: 'Numbered', value: 'number' }
	],
	marks: {
		decorators: [
			{ title: 'Bold', value: 'strong' },
			{ title: 'Italic', value: 'em' }
		],
		annotations: [
			{
				name: 'link',
				title: 'Link',
				type: 'object',
				fields: [
					defineField({
						name: 'href',
						title: 'URL',
						type: 'url',
						validation: (Rule) =>
							Rule.required().uri({ scheme: ['http', 'https', 'mailto'], allowRelative: true })
					})
				]
			}
		]
	}
});

export default defineType({
	name: 'competitionTeamsPage',
	title: 'Competition Teams',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Page Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'Competition Teams'
		}),
		defineField({
			name: 'teams',
			title: 'Teams',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'team',
					title: 'Team',
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							description: 'e.g. "CCDC"',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'fullName',
							title: 'Full Name',
							description: 'e.g. "Collegiate Cyber Defense Competition"',
							type: 'string'
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'array',
							of: [formattedText],
							validation: (Rule) => Rule.required()
						})
					],
					preview: {
						select: { title: 'name', subtitle: 'fullName' }
					}
				})
			],
			initialValue: [
				{
					_key: 'ccdc',
					_type: 'team',
					name: 'CCDC',
					fullName: 'Collegiate Cyber Defense Competition'
				},
				{
					_key: 'cptc',
					_type: 'team',
					name: 'CPTC',
					fullName: 'Collegiate Penetration Testing Competition'
				},
				{ _key: 'ctf', _type: 'team', name: 'CTF', fullName: 'Capture The Flag' }
			]
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
			return { title: 'Competition Teams Page' };
		}
	}
});
