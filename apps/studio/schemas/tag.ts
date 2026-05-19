import { defineType, defineArrayMember, defineField } from 'sanity';

export default defineType({
	name: 'tag',
	title: 'Tag',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'type',
			title: 'Resource Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Competition', value: 'competition' },
					{ title: 'Skills', value: 'skills' },
					{ title: 'Experience', value: 'experience' }
				],
				layout: 'dropdown'
			}
		})
	]
});
