import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'competitions',
      title: 'Competitions',
      type: 'object',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hackerlab',
      title: 'Hackerlab',
      type: 'object',
      fields: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'image',
              title: 'Image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  description:
                    'Refer to https://accessibility.huit.harvard.edu/describe-content-images for guidance on writing helpful alternative text for images.',
                  type: 'string',
                  validation: (Rule) => [
                    Rule.required().error('You must provide alternative text for the image.'),
                    Rule.regex(/^(image|photo) of/i, {
                      name: 'altTextImageOf',
                      invert: true,
                    }).warning('Alternative text should not start with "Image/Photo of"'),
                  ],
                },
              ],
              validation: (Rule) => Rule.required().assetRequired(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
