
//component for a product mapped products come here get styled and then shown
import Link from 'next/link';
import { Product as ProductType } from '../sanity.types';
import {urlFor} from '../sanity/lib/client'
import Image from 'next/image';
type Props = {
  productProp: ProductType;
  
};

const Product =  ({ productProp }: Props)=> {
  const { name, price, image, slug } = productProp;
//  without .url() we will get builder
   const imageUrl = image && image[0] ? urlFor(image[0]).url() : '';
    const productSlug = slug?.current ?? '#'; // fallback to '#' if slug is missing

  return (
    <div>
      <Link href={`/product/${productSlug}`}>
        {/* whole div containing a single product with its detail */}
        <div className='product-card'>
          
          <Image src={imageUrl} 
          width={250}
          height={250}          
          alt='product image'
          className='product-image'
          />
          <p className='product-name'>{name}</p>
           <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}
export default Product