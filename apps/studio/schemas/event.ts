import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'start',
      title: 'Start',
      type: 'datetime',
      options: {
        timeFormat: 'h:mm A',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'End',
      type: 'datetime',
      options: {
        timeFormat: 'h:mm A',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
        }),
        defineArrayMember({
          name: 'pdf',
          title: 'PDF',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'file',
              title: 'Document',
              type: 'file',
              options: {
                accept: '.pdf',
              },
            }),
          ],
        }),
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{field: 'start', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      media: 'image',
      title: 'title',
      start: 'start',
      end: 'end',
    },
    prepare({start, end, ...selection}) {
      const startTime = new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(start))
      const endTime = new Intl.DateTimeFormat('en', {
        timeStyle: 'short',
      }).format(new Date(end))

      return {
        subtitle: startTime + ' - ' + endTime,
        ...selection,
      }
    },
  },
})
