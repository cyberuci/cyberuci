import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'resource',
	title: 'Resource',
	type: 'document',
	fields: [
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
			name: 'notes',
			title: 'Notes',
			type: 'text',
			description: 'Extra context like “this is good for reviewing X…”'
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Documentation', value: 'documentation' },
					{ title: 'Tool', value: 'tool' },
					{ title: 'Video', value: 'video' },
					{ title: 'Other', value: 'other' }
				],
				layout: 'dropdown'
			}
		}),
		defineField({
			name: 'link',
			title: 'Resource Link',
			type: 'url'
		}),
		defineField({
			name: 'image',
			title: 'Thumbnail',
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
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			}
		})
	]
});
