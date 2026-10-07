import { defineArrayMember, defineField, defineType } from 'sanity';
import { altTextField } from '../helpers';

export default defineType({
	name: 'fundraiserPage',
	title: 'Fundraiser',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Fundraiser title',
			description: '"[title] fundraiser!"',
			type: 'string'
		}),
		defineField({
			name: 'otherDesc',
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
			name: 'description',
			title: 'Short Message',
			type: 'string'
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			description: 'The button appears on this date, Pacific time.',
			type: 'date'
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			description: 'The button stays up through this date, then disappears.',
			type: 'date',
			validation: (Rule) =>
				Rule.custom((endDate, context) => {
					const parent = context.parent as { startDate?: string } | undefined;
					if (!endDate || !parent?.startDate) return true;

					return endDate >= parent.startDate
						? true
						: 'The end date must be on or after the start date.';
				})
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
