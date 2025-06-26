import { defineArrayMember, defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';

export default defineType({
	name: 'news',
	title: 'News',
	icon: Newspaper,
	type: 'document',
	fields: [
		defineField({
			name: 'date',
			type: 'date',
			title: 'Date',
			initialValue: new Date().toISOString().slice(0, 10),
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			options: {
				source: 'title'
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'cover',
			type: 'image',
			title: 'Cover',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Content',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' }
					],
					lists: [],
					marks: {
						decorators: []
					}
				})
			],
			validation: (Rule) => Rule.required()
		})
	]
});
