import { defineArrayMember, defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';

export default defineType({
	name: 'news',
	title: 'News',
	icon: Newspaper,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title'
		}),
		defineField({
			name: 'cover',
			type: 'image',
			title: 'Cover'
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
				}),
				defineArrayMember({
					type: 'achievements'
				})
			]
		})
	]
});
