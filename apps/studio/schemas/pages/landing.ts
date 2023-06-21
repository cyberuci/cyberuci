import {defineArrayMember, defineField, defineType} from 'sanity'
import groq from 'groq'

export default defineType({
  name: 'landingPage',
  title: 'Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Landing Page'}
    },
  },
})
