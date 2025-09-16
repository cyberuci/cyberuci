import { defineField, defineType } from 'sanity';
import { Handshake } from 'lucide-react';

export default defineType({
	name: 'sponsor',
	title: 'Sponsor',
	icon: Handshake,
	type: 'document',
	fields: [
		defineField({
			name: 'since',
			type: 'date',
			title: 'Sponsor Since',
			initialValue: new Date().toISOString().slice(0, 10),
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'tier',
			type: 'string',
			title: 'Tier',
			options: {
				list: [
					{ title: 'Gold', value: 'gold' },
					{ title: 'Silver', value: 'silver' },
					{ title: 'Special Thanks', value: 'special' }
				]
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'name',
			type: 'string',
			title: 'Name',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'logo',
			type: 'image',
			title: 'Logo / Photo',
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative Text',
					type: 'string',
					validation: (Rule) => Rule.required()
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'logoDark',
			type: 'image',
			title: 'Logo for Dark Backgrounds'
		}),
		defineField({
			name: 'note',
			type: 'text',
			title: 'Note'
		})
	],
	preview: {
		select: {
			title: 'name'
		}
	}
});
