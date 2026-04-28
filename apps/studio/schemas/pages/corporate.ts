import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'corporatePage',
	title: 'Corporate',
	type: 'document',
	fields: [
		defineField({
			name: 'sponsorshipPackage',
			title: 'Sponsorship Package',
			type: 'object',
			fields: [
				defineField({
					name: 'file',
					title: 'PDF File',
					type: 'file',
					options: { accept: 'application/pdf' },
					validation: (Rule) => Rule.required()
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'object',
			fields: [
				defineField({
					name: 'label',
					title: 'Label',
					description: 'Small tag above the headline, e.g. "[SPONSOR US]"',
					type: 'string',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'headline',
					title: 'Headline',
					type: 'string',
					validation: (Rule) => Rule.required()
				}),
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
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'tiersDescription',
			title: 'Tiers Intro',
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
			name: 'additionalOpportunitiesDescription',
			title: 'Additional Opportunities Intro',
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
			name: 'about',
			title: 'About Cards',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'card',
					title: 'Card',
					type: 'object',
					fields: [
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
					],
					preview: {
						select: { title: 'title', subtitle: 'description' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		}),
		defineField({
			name: 'whySponsor',
			title: 'Why Sponsor',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'reason',
					title: 'Reason',
					type: 'object',
					fields: [
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
					],
					preview: {
						select: { title: 'title', subtitle: 'description' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		}),
		defineField({
			name: 'clubEvents',
			title: 'Club Events',
			type: 'object',
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
					name: 'events',
					title: 'Events',
					type: 'array',
					of: [
						defineArrayMember({
							name: 'event',
							title: 'Event',
							type: 'object',
							fields: [
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
							],
							preview: {
								select: { title: 'title', subtitle: 'description' }
							}
						})
					],
					validation: (Rule) => Rule.required().min(1)
				})
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'tiers',
			title: 'Sponsorship Tiers',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'tier',
					title: 'Tier',
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'price',
							title: 'Price',
							description: 'e.g. "$200+"',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'color',
							title: 'Color',
							description: 'Hex color code, e.g. #cd7f32',
							type: 'string',
							validation: (Rule) => Rule.required().regex(/^#[0-9a-fA-F]{6}$/, { name: 'hex' })
						}),
						defineField({
							name: 'perks',
							title: 'Perks',
							type: 'array',
							of: [defineArrayMember({ type: 'string' })],
							validation: (Rule) => Rule.required().min(1)
						})
					],
					preview: {
						select: { title: 'name', subtitle: 'price' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		}),
		defineField({
			name: 'achievements',
			title: 'Achievements',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'achievement',
					title: 'Achievement',
					type: 'object',
					fields: [
						defineField({
							name: 'year',
							title: 'Year',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'text',
							title: 'Achievement',
							type: 'string',
							validation: (Rule) => Rule.required()
						})
					],
					preview: {
						select: { title: 'text', subtitle: 'year' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		}),
		defineField({
			name: 'contacts',
			title: 'Contact Info',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'contact',
					title: 'Contact',
					type: 'object',
					fields: [
						defineField({
							name: 'label',
							title: 'Label',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'value',
							title: 'Display Value',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'href',
							title: 'Link',
							type: 'url',
							validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https', 'mailto'] })
						})
					],
					preview: {
						select: { title: 'label', subtitle: 'value' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		}),
		defineField({
			name: 'additionalOpportunities',
			title: 'Additional Opportunities',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'opportunity',
					title: 'Opportunity',
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'string',
							validation: (Rule) => Rule.required()
						})
					],
					preview: {
						select: { title: 'title', subtitle: 'description' }
					}
				})
			],
			validation: (Rule) => Rule.required().min(1)
		})
	],

	preview: {
		prepare() {
			return { title: 'Corporate Page' };
		}
	}
});
