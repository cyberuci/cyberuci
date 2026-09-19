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
			name: 'applicationAnnouncement',
			title: 'Subteam Application Banner',
			description:
				'Optional site-wide banner shown above the navigation. It changes from “opens” to “open until” automatically and disappears after the closing time.',
			type: 'object',
			options: { collapsible: true, collapsed: false },
			initialValue: {
				enabled: false,
				link: 'https://airtable.com/appYhYCpb0un2lCgC/paguAHSYAoOhH13CT/edit'
			},
			fields: [
				defineField({
					name: 'enabled',
					title: 'Enabled',
					type: 'boolean',
					initialValue: false,
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'opensAt',
					title: 'Applications Open',
					type: 'datetime',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'closesAt',
					title: 'Applications Close',
					type: 'datetime',
					validation: (Rule) =>
						Rule.required().custom((closesAt, context) => {
							const parent = context.parent as { opensAt?: string } | undefined;
							if (!closesAt || !parent?.opensAt) return true;

							return new Date(closesAt) > new Date(parent.opensAt)
								? true
								: 'The closing time must be after the opening time.';
						})
				}),
				defineField({
					name: 'link',
					title: 'Application Link',
					type: 'url',
					initialValue: 'https://airtable.com/appYhYCpb0un2lCgC/paguAHSYAoOhH13CT/edit',
					validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] })
				})
			]
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
