import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'achievementsPage',
	title: 'Timeline',
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
			name: 'achievements',
			title: 'Entries',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'achievement',
					title: 'Entry',
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'category',
							title: 'Category',
							type: 'reference',
							to: [{ type: 'timelineCategory' }],
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'placing',
							title: 'Placing',
							description: 'e.g. 1st place, 2nd place — leave blank if not a competition result',
							type: 'string'
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3
						}),
						defineField({
							name: 'image',
							title: 'Image',
							description: 'Optional photo shown when the card is expanded',
							type: 'image',
							options: { hotspot: true }
						})
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'year',
							media: 'image'
						}
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		})
	],

	preview: {
		prepare() {
			return { title: 'Timeline' };
		}
	}
});
