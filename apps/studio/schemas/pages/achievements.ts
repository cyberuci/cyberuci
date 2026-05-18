import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'achievementsPage',
	title: 'Achievements',
	type: 'document',
	fields: [
		defineField({
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: { decorators: [] }
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'images',
			title: 'Timeline Images',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'image',
					fields: [
						{
							name: 'alt',
							title: 'Alternative Text',
							type: 'string',
							validation: (Rule) => Rule.required()
						}
					],
					options: { hotspot: true }
				})
			]
		}),
		defineField({
			name: 'achievements',
			title: 'Achievements',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'achievement',
					title: 'Achievement',
					type: 'object',
					fields: [
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'category',
							title: 'Category',
							description: 'e.g. CCDC, CPTC, Results, Milestones',
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
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'placing',
							title: 'Placing',
							description: 'e.g. 1st place, 2nd place',
							type: 'string'
						})
					],
					preview: {
						select: { title: 'title', subtitle: 'year' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		})
	],

	preview: {
		prepare() {
			return { title: 'Achievements Page' };
		}
	}
});
