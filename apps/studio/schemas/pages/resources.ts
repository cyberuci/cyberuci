import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'resources',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    // add more 
  ]
});

