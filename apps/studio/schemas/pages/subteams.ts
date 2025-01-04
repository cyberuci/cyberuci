import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'subteamsPage',
	title: 'Subteams',
	type: 'document',
	fields: [
		defineField({
			name: 'subteams',
			title: 'Subteams',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'subteam',
					title: 'Subteam',
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string'
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text'
						})
					]
				})
			]
		})
	],

	preview: {
		prepare() {
			return { title: 'Subteams Page' };
		}
	}
});
