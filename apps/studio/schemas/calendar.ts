import { defineField, defineType } from 'sanity';
import { CalendarDays } from 'lucide-react';

export default defineType({
	name: 'calendar',
	title: 'Calendar',
	icon: CalendarDays,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'calendarLink',
			type: 'string',
			title: 'Google Calendar Link',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'backgroundColor',
			type: 'color',
			title: 'Background Color',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'supportingColor',
			type: 'color',
			title: 'Supporting Color',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'textColor',
			type: 'color',
			title: 'Text Color',
			validation: (Rule) => Rule.required()
		})
	]
});
