import {defineType, defineField, defineArrayMember} from 'sanity'

const titles = ['President', 'External VP', 'Internal VP', 'Treasurer', 'Secretary']
const terms = ['Fall', 'Winter', 'Spring']

export default defineType({
  name: 'board',
  title: 'Board',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      initialValue: new Date().getFullYear(),
      validation: (Rule) => Rule.required().integer().min(1000).max(9999),
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
              options: {
                list: titles.map((title) => ({title, value: title})),
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'terms',
              title: 'Terms',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'string',
                }),
              ],
              initialValue: terms,
              options: {
                sortable: false,
                list: terms.map((term) => ({title: term, value: term})),
              },
            }),
            defineField({
              name: 'person',
              title: 'Person',
              type: 'reference',
              to: [{type: 'person'}],
            }),
          ],

          preview: {
            select: {
              title: 'title',
              media: 'person.image',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      year: 'year',
    },
    prepare({year}) {
      return {
        title: year,
      }
    },
  },
})
