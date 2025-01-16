import { defineArrayMember, defineField, defineType } from 'sanity';
import groq from 'groq';

export default defineType({
	name: 'contactPage',
	title: 'Contact',
	type: 'document',
	fields: [
		defineField({
			name: 'sections',
			title: 'Sections',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'section',
					title: 'Section',
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
						}),
						defineField({
							name: 'contacts',
							title: 'Contacts',
							type: 'array',
							of: [
								defineArrayMember({
									type: 'reference',
									to: [{ type: 'person' }],
									validation: (Rule) =>
										Rule.custom((personRef, context) => {
											const { getClient } = context;
											const client = getClient({ apiVersion: '2023-04-08' });

											return client
												.fetch<{ email: string | null }>(
													groq`
                            *[_type == "person" && _id == $id][0] {
                              email
                            }
                          `,
													{ id: personRef?._ref }
												)
												.then(({ email }) =>
													email ? true : 'Selected contact does not have an email address.'
												);
										})
								})
							],
							validation: (Rule) =>
								Rule.custom((sections) =>
									sections?.length ? true : 'Sections must contain at least one contact.'
								)
						})
					],

					preview: {
						select: {
							title: 'title',
							subtitle: 'description'
						}
					}
				})
			],
			validation: (Rule) => Rule.unique()
		})
	],

	preview: {
		prepare() {
			return { title: 'Contact Page' };
		}
	}
});
