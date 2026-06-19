import { defineType, defineField, defineArrayMember } from 'sanity';
import { UserIcon } from '@sanity/icons';

export default defineType({
	name: 'alumni',
	title: 'Alumni',
	icon: UserIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'personal',
			type: 'document',
			fields: [
				{
					title: 'Preferred Name',
					name: 'preferredName',
					type: 'string',
					validation: (rule) => rule.required()
				},
				{
					title: 'Graduation Term',
					name: 'graduationTerm',
					type: 'string',
					validation: (rule) => rule.required()
				},
				defineField({
					name: 'majors',
					title: 'Majors',
					type: 'array',
					of: [
						defineArrayMember({
							type: 'string'
						})
					],
					validation: (Rule) => Rule.unique()
				})
			]
		}),
		defineField({
			name: 'currentRole',
			type: 'document',
			fields: [
				{
					title: 'Title',
					name: 'title',
					type: 'string',
					validation: (rule) => rule.required()
				},
				{
					title: 'Company',
					name: 'company',
					type: 'string'
				}
			]
		}),
		defineField({
			name: 'cyberUCI',
			type: 'document',
			fields: [
				{
					title: 'Role',
					name: 'role',
					type: 'string',
					validation: (rule) => rule.required()
				}
			]
		}),
		defineField({
			name: 'quote',
			type: 'string',
			validation: (rule) => rule.required()
		})
	],

	preview: {
		select: {
			title: 'personal.preferredName',
			media: 'image'
		}
	}
});
