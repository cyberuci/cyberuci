import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      description: 'Only the first value is currently displayed.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'discord',
      title: 'Discord Username',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\w+#\d{4}$/).error('Does not match the following pattern: username#0000.'),
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
      name: 'majors',
      title: 'Majors',
      description: 'Only the first value is currently displayed.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'graduation',
      title: 'Graduation Year',
      type: 'number',
      initialValue: new Date().getFullYear(),
      validation: (Rule) => Rule.required().integer().min(1000).max(9999),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
