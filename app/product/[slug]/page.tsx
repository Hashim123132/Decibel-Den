'use client'

import { client } from '../../../sanity/lib/client';
import {urlFor} from '../../../sanity/lib/client'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { Product as ProductType } from '../../../sanity.types';
import { useState } from 'react';


type Props = {
  params: { slug: string }
};

export async function generateStaticParams() {
  const query = `*[_type == "product"] { slug {current} }`;
  const Product = await client.fetch(query);

   return Product.map((product: { slug: { current: string } }) => ({
    slug: product.slug.current,
  }));
 
}
//by slug we get product
const fetchProductBySlug = async (slug: string) => {
                                         //Match the slug field(sanity) with the passed $slug(dynamic url) value
  const query = `*[_type == "product" && slug.current == $slug] [0]`;// Return the first matching item only
   //$slug is place holder we inject it with {slug} known as parameterized querying
   const Product = await client.fetch(query, { slug });
  
   //for related products
   const Productquery = '*[_type == "product"]'
 
  
  
 const RelatedProducts = await client.fetch(Productquery);

 return{

  Product, RelatedProducts 
};

}
//dynamic segments of URL = params
export default async function ProductDetails({ params }: Props) {
  const { Product, RelatedProducts }= await fetchProductBySlug(params.slug);
  const [index, setIndex] = useState(0)


  if (!Product) {
    return notFound();
  }  
  const {name, price, details, image}= Product
  
  return (
        <div>
            <div className="product-detail-container">
             
              <div>
                  <div className="image-container"> 
                     <Image
                        src={image?.[0] ? urlFor(image[index]).url() : ''}
                        alt={name ?? ''}
                        width={500} 
                        height={500}
                        className="product-image"
                      />
                  </div>
                  {/* carousel div */}
                  
                 <div className="small-images-container">
                    {Product.image?.map((item: any, i: number) => (
                      <div key={i}>
                        <Image
                          src={urlFor(item).url()}
                          alt={`product image ${i}`}
                          width={500}
                          height={500}
                          className={i === index ? 'small-image selected-image' : 'small-image'}
                          onMouseEnter={() => setIndex(i)}
                        />
                      </div>
                    ))}
                  </div>
              </div>
              
              <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                  <div className='flex'>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                  </div>
                  <p>
                    (20)
                  </p>
                </div>
                  <h4>Details:</h4>
                  <p>{details}</p>
                  <p className="price">${price}</p>
                  <div className='quantity'>
                    <h3 className=''>
                      Quantity:
                    </h3>
                      <p className='quantity-desc'>
                        <span className='minus' >
                          <AiOutlineMinus />
                        </span>
                        
                        <span className='num' >
                          0
                        </span>
                        
                        <span className='plus' >
                          <AiOutlinePlus />
                        </span>
                      </p>
                  </div>
                  <div className='buttons'>
                    <button type='button' className='add-to-cart' >
                      Add to Cart
                    </button>

                   <button type='button' className='buy-now' >
                     Buy Now
                    </button>
                  </div>
                
           
              </div>
                    
            </div>
              <div className='maylike-products-wrapper'>
                 <h2>You may also like</h2>
                 <div className='marquee'>
                  <div className='maylike-products-container'>
                    {RelatedProducts.map((item: ProductType) => (
                      <Product key={item._id} productProp={item} />
                    ))}
                  </div>
                 </div>
              </div>
        </div>
)
}
