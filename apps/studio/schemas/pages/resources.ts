import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'resources',
  title: 'Resources Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resources',
      title: 'Resources List',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Resource',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Documentation', value: 'documentation' },
                  { title: 'Tool', value: 'tool' },
                  { title: 'Video', value: 'video' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Resource Link',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'image',
              title: 'Thumbnail',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Alt text is required for accessibility.'),
                }),
              ],
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'resources.length',
    },
  },
});

