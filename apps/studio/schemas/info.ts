import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'info',
	title: 'Info',
	type: 'document',
	fields: [
		defineField({
			name: 'email',
			title: 'Email',
			type: 'email',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'socials',
			title: 'Socials',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'platform',
							title: 'Platform',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'link',
							title: 'Link',
							type: 'url',
							validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https', 'mailto'] })
						})
					],
					preview: {
						select: {
							title: 'platform',
							subtitle: 'label',
							icon: 'icon'
						},
						prepare({ title, subtitle }) {
							return {
								title,
								subtitle
							};
						}
					}
				}
			],
			validation: (Rule) => Rule.unique()
		})
	],
	preview: {
		prepare() {
			return { title: 'Socials' };
		}
	}
});
