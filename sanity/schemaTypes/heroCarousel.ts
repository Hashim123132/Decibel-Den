export default {
  name: 'heroCarousel',
  title: 'Hero Carousel',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Carousel Title',
      type: 'string',
    },
    {
      name: 'banners',
      title: 'Banners',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'banner' }],
        },
      ],
    },
  ],
};
