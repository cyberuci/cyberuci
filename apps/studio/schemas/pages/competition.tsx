import { defineArrayMember, defineField, defineType } from 'sanity';
import { Medal } from 'lucide-react';

export const achievements = defineType({
	name: 'achievements',
	title: 'Achievements',
	type: 'object',
	icon: <Medal size={14} strokeWidth={1.5} />,
	fields: [
		defineField({
			name: 'years',
			title: 'Years',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'year',
					title: 'Year',
					type: 'object',
					fields: [
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number'
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
											name: 'title',
											title: 'Competition Title',
											type: 'string'
										}),
										defineField({
											name: 'placing',
											title: 'Placing',
											type: 'string'
										})
									]
								})
							]
						})
					],

					preview: {
						select: {
							title: 'year'
						}
					}
				})
			]
		})
	],

	preview: {
		prepare() {
			return { title: 'Achievements' };
		}
	}
});

export default defineType({
	name: 'competitionPage',
	title: 'Competition',
	type: 'document',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			title: 'Content',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' }
					],
					lists: [],
					marks: {
						decorators: []
					}
				}),
				defineArrayMember({
					type: 'achievements'
				})
			]
		})
	],

	preview: {
		prepare() {
			return { title: 'Competition Page' };
		}
	}
});
