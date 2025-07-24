//defining rules for db

export default {
    name: 'product',
    title: 'product',
    type:'document',
    //the product  have image field. name field etc
     
    fields:[
       // 1. Image Field
       
        {
          name:'image',
          title: 'Image',
          type: 'array',
          of:[{type: 'image'}],
          
          options:{
            hotspot:true
          }
        },

        //2.Name
        {
          name:'name',
          title:'Name',
          type:'string',
        },
        
        //4. Price
        {
            name:'slug',
            title:'Slug',
            type:'slug',
            options:{
                source: 'name',
                maxLength:90,
            }
        },
        //5.Details
        {
         name: 'price',
         title:'Price',
         type:'number'
        },

        {
            name:'details',
            title:'Details',
            type:'string'
        },
        {
          name: 'category',
          title: 'Category',
          type: 'string',
          options: {
            list: [
            { title: 'Headphones', value: 'headphones' },
            { title: 'Speakers', value: 'speakers' },
            { title: 'Earphones', value: 'headphones' },
    ],
    layout: 'dropdown',
  },
}



    ]
}