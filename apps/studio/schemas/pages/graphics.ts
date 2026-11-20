import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'graphicsPage',
	title: 'Graphics',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Page Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			initialValue: 'Graphics'
		}),
		defineField({
			name: 'intro',
			title: 'Intro',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'tasks',
			title: 'Tasks',
			type: 'array',
			of: [
				defineField({
					name: 'task',
					type: 'string',
					validation: (Rule) => Rule.required()
				})
			],
			validation: (Rule) => Rule.required().min(3)
		}),
		defineField({
			name: 'spotlight',
			title: 'Spotlight Picture',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative Text',
					type: 'string',
					validation: (Rule) => Rule.required()
				})
			]
		})
	],

	preview: {
		prepare() {
			return { title: 'Graphics Page' };
		}
	}
});
