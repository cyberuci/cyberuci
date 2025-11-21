import { defineArrayMember, defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';

export default defineType({
	name: 'newsLink',
	title: 'New Links',
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
			name: 'cover',
			type: 'image',
			title: 'Cover',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'link',
			type: 'url',
			title: 'Link',
			validation: (Rule) => Rule.required()
		})
	]
});
