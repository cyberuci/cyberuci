import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'homePage',
	title: 'Home',
	type: 'document',
	fields: [
		// Section 1: Header (or News override)
		defineField({
			name: 'highlightNews',
			title: 'Highlight News',
			type: 'object',
			fields: [
				defineField({
					name: 'enable',
					title: 'Enable',
					type: 'boolean',
					description: 'Showcase news article as homepage rather than default landing text.'
				}),
				defineField({
					name: 'article',
					title: 'News Article',
					type: 'reference',
					to: [{ type: 'news' }]
				})
			]
		}),
		defineField({
			name: 'hero',
			title: 'Hero Background Image',
			type: 'image',
			fields: [
				{
					name: 'alt',
					title: 'Alternative Text',
					description:
						'Refer to https://accessibility.huit.harvard.edu/describe-content-images for guidance on writing helpful alternative text for images.',
					type: 'string',
					validation: (Rule) => [
						Rule.required().error('You must provide alternative text for the image.'),
						Rule.regex(/^(image|photo) of/i, {
							name: 'altTextImageOf',
							invert: true
						}).warning('Alternative text should not start with "Image/Photo of"')
					]
				}
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'competitions',
			title: 'Competitions',
			type: 'object',
			fields: [
				defineField({
					name: 'image',
					title: 'Display Image',
					type: 'image',
					fields: [
						{
							name: 'alt',
							title: 'Alternative Text',
							description:
								'Refer to https://accessibility.huit.harvard.edu/describe-content-images for guidance on writing helpful alternative text for images.',
							type: 'string',
							validation: (Rule) => [
								Rule.required().error('You must provide alternative text for the image.'),
								Rule.regex(/^(image|photo) of/i, {
									name: 'altTextImageOf',
									invert: true
								}).warning('Alternative text should not start with "Image/Photo of"')
							]
						}
					],
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'subtitle',
					title: 'Competition Names',
					type: 'string',
					description: 'Shown as the blue heading, e.g. "CCDC, CPTC, & NCL"',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'description',
					title: 'Description',
					type: 'text',
					validation: (Rule) => Rule.required()
				})
			],
			validation: (Rule) => Rule.required()
		}),

		// Section 4: HackerLab
		defineField({
			name: 'hackerlab',
			title: 'HackerLab',
			type: 'object',
			fields: [
				defineField({
					name: 'location',
					title: 'Image',
					type: 'image',
					fields: [
						{
							name: 'alt',
							title: 'Alternative Text',
							description:
								'Refer to https://accessibility.huit.harvard.edu/describe-content-images for guidance on writing helpful alternative text for images.',
							type: 'string',
							validation: (Rule) => [
								Rule.required().error('You must provide alternative text for the image.'),
								Rule.regex(/^(image|photo) of/i, {
									name: 'altTextImageOf',
									invert: true
								}).warning('Alternative text should not start with "Image/Photo of"')
							]
						}
					],
					validation: (Rule) => Rule.required().assetRequired()
				}),
				defineField({
					name: 'images',
					title: 'Images',
					type: 'array',
					description:
						'Photos shown in the HackerLab section. First image is used as the main photo. Second will be the map image.',
					of: [
						defineArrayMember({
							type: 'image',
							fields: [
								defineField({
									name: 'alt',
									title: 'Alt Text',
									type: 'string',
									validation: (Rule) => Rule.required()
								})
							]
						})
					]
				}),
				defineField({
					name: 'description',
					title: 'Description',
					type: 'text'
				})
			],
			validation: (Rule) => Rule.required()
		})
	],

	preview: {
		prepare() {
			return { title: 'Home Page' };
		}
	}
});
