import { defineType, defineArrayMember, defineField } from 'sanity';

export default defineType({
	name: 'resourcecopy',
	title: 'Resource',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'content',
			type: 'array',
			title: 'Content',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [{ title: 'Bold', value: 'strong' }]
					}
				})
			]
		}),
		defineField({
			name: 'externalResource',
			title: 'External Resource?',
			type: 'boolean',
			options: {
				layout: 'checkbox' // This makes it appear as a checkbox instead of a switch
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'CCDC', value: 'CCDC' },
					{ title: 'CPTC', value: 'CPTC' },
					{ title: 'CTF', value: 'CTF' },
					{ title: 'General', value: 'General' }
				],
				layout: 'dropdown'
			}
		}),
		defineField({
			name: 'resource_type',
			title: 'Resource Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Tool', value: 'tool' },
					{ title: 'Guide', value: 'guide' },
					{ title: 'Certification', value: 'certification' },
					{ title: 'Other', value: 'other' }
				],
				layout: 'dropdown'
			}
		}),
		defineField({
			name: 'link',
			title: 'Resource Link',
			type: 'url'
		}),
		defineField({
			name: 'thumbnail',
			title: 'Thumbnail',
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative Text',
					type: 'string',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'isLogo',
					title: 'Is this a resource logo?',
					type: 'boolean',
					validation: (Rule) => Rule.required()
				})
			]
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			}
		})
	]
});
