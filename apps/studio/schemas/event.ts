import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export default defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'og',
      title: 'Social Media Previews',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      name: 'ogImage',
      title: 'Image',
      description:
        'This image will be used to generate social media previews for this event. Minimal Image Resolution: 400px x 600px.',
      type: 'image',
      fieldset: 'og',
    }),
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
    // TODO: store event times more robustly with timezone
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
      image: 'image',
      ogImage: 'ogImage',
      title: 'title',
      start: 'start',
      end: 'end',
    },
    prepare({image, ogImage, start, end, ...selection}) {
      const startTime = new Intl.DateTimeFormat('en', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(start))
      const endTime = new Intl.DateTimeFormat('en', {
        timeStyle: 'short',
      }).format(new Date(end))

      return {
        media: image ?? ogImage,
        subtitle: startTime + ' - ' + endTime,
        ...selection,
      }
    },
  },
})
