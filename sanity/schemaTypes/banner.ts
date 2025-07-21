export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    
    //still keeping backward fucntionality
          {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      //added images array for more images on hero section
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
    {
      name: 'buttonText', 
      title: 'Button Text',
      type: 'string',
    },
    //this  needs changing if you want to revert back for slides this much info is added
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
    {
      type: 'object',
      fields: [
        {
          name: 'image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'product',
          type: 'reference',
          to: [{ type: 'product' }],
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'View Product', // optional default
        },
      ],
    },
  ],
},
    {
      name: 'desc',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'smallText',
      title: 'Small Text',
      type: 'string',
    },
    {
      name: 'midText',
      title: 'Mid Text',
      type: 'string',
    },
    {
      name: 'largeText1',
      title: 'Large Text 1',
      type: 'string',
    },
    {
      name: 'largeText2',
      title: 'Large Text 2',
      type: 'string',
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'string',
    },
    {
      name: 'saleTime',
      title: 'Sale Time',
      type: 'string',
    },
  ],
};
