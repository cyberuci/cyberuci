import { defineArrayMember, defineField } from 'sanity';

/** Plain portable text — no headings, lists, or decorators */
export const simpleBlock = defineArrayMember({
	type: 'block',
	styles: [{ title: 'Normal', value: 'normal' }],
	lists: [],
	marks: { decorators: [] }
});

/** Image alt text with the usual a11y checks */
export const altTextField = defineField({
	name: 'alt',
	title: 'Alternative Text',
	description: 'Describe what’s in the image. Don’t start with “Image of” / “Photo of”.',
	type: 'string',
	validation: (Rule) => [
		Rule.required().error('You must provide alternative text for the image.'),
		Rule.regex(/^(image|photo) of/i, {
			name: 'altTextImageOf',
			invert: true
		}).warning('Alternative text should not start with "Image/Photo of"')
	]
});

export function imageWithAlt(
	overrides: { name?: string; title?: string; required?: boolean } = {}
) {
	const { name = 'image', title = 'Image', required = true } = overrides;
	return defineField({
		name,
		title,
		type: 'image',
		fields: [altTextField],
		options: { hotspot: true },
		validation: required ? (Rule) => Rule.required().assetRequired() : undefined
	});
}

/** Reusable title + description pair for cards / list items */
export const titleDescriptionFields = [
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
	})
];
