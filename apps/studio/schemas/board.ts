import { defineType, defineField, defineArrayMember } from 'sanity';
import { UsersIcon } from '@sanity/icons';

const titles = ['President', 'External VP', 'Internal VP', 'Treasurer', 'Secretary'];
const terms = ['Fall', 'Winter', 'Spring'];

export default defineType({
	name: 'board',
	title: 'Board',
	icon: UsersIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'year',
			title: 'Year',
			description:
				'This represents the starting year of this board. For example, 2021 would represent the 2021 - 2022 board.',
			type: 'number',
			initialValue: new Date().getFullYear(),
			validation: (Rule) => Rule.required().integer().min(1000).max(9999)
		}),
		defineField({
			name: 'sections',
			title: 'Sections',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'section',
					title: 'Section',
					description:
						'Sections are no longer displayed separately on the board page. However, for members in more than one section, their titles are displayed in the order of their corresponding sections.',
					type: 'object',
					fields: [
						defineField({
							name: 'label',
							title: 'Label',
							description: 'The section label will be hidden if there is only one section.',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'members',
							title: 'Members',
							type: 'array',
							of: [
								defineArrayMember({
									name: 'member',
									title: 'Member',
									type: 'object',
									fields: [
										defineField({
											name: 'title',
											title: 'Title',
											type: 'string',
											validation: (Rule) => Rule.required()
										}),
										defineField({
											name: 'terms',
											title: 'Terms',
											description: 'This value is currently ignored.',
											type: 'array',
											of: [
												defineArrayMember({
													type: 'string'
												})
											],
											initialValue: terms,
											options: {
												sortable: false,
												list: terms.map((term) => ({ title: term, value: term }))
											}
										}),
										defineField({
											name: 'person',
											title: 'Person',
											type: 'reference',
											to: [{ type: 'person' }],
											validation: (Rule) => Rule.required()
										})
									],

									preview: {
										select: {
											title: 'person.name',
											subtitle: 'title',
											media: 'person.image'
										}
									}
								})
							],
							validation: (Rule) => Rule.unique().required()
						})
					],

					preview: {
						select: {
							title: 'label',
							members: 'members'
						},
						prepare({ members, ...selection }) {
							return { subtitle: `${members?.length ?? 0} Members`, ...selection };
						}
					}
				})
			],
			validation: (Rule) => Rule.unique().required()
		})
	],

	preview: {
		select: {
			year: 'year'
		},
		prepare({ year }) {
			return {
				title: `${year} - ${year + 1}`
			};
		}
	}
});
