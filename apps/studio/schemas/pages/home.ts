import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'homePage',
	title: 'Home',
	type: 'document',
	fields: [
		// Section 1: Header (or News override)
		defineField({
			name: 'Header',
			title: 'Header',
			type: 'image'
		}),
		// Section 3: Competitions (after Events, which is pulled from Google Calendar)
		defineField({
			name: 'competitions',
			title: 'Competitions',
			type: 'object',
			fields: [
				defineField({
					name: 'image',
					title: 'Competition Image',
					type: 'image',
					description: 'cover image for the competition section',
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
					name: 'isOpen',
					title: 'Is Open',
					type: 'boolean',
					description: 'Toggles the open/closed status badge shown on the homepage.',
					initialValue: false
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
