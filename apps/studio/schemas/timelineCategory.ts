import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'timelineCategory',
	title: 'Timeline Category',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'color',
			title: 'Color',
			description: 'Color used for the left stripe on timeline cards',
			type: 'color'
		})
	],
	preview: {
		select: { title: 'name' }
	}
});
