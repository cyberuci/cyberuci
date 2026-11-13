import { defineArrayMember, defineField, defineType } from 'sanity';
import { altTextField } from '../helpers';

export default defineType({
	name: 'fundraiserPage',
	title: 'Fundraiser',
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
			name: 'poster',
			title: 'Poster',
			description:
				'Image shown as the whole fundraiser page. Leave this empty to use the built-in fallback.',
			type: 'image',
			fields: [altTextField]
		})
	],
	preview: {
		prepare() {
			return { title: 'Fundraiser Page' };
		}
	}
});
