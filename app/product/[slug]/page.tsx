'use client';
//this is the product page where we see add to cart button and you may also like products
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../../../sanity/lib/client';
import Image from 'next/image';
import Product from '../../../components/Product';
import { useStateContext } from '../../context/StateContext'

import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai';
import type { Product as ProductType } from '../../../sanity.types';
import { toast } from 'sonner';
import getStripe from '@/lib/getStripe';

export const dynamic = 'force-dynamic'; // (optional) always render on the server and rehydrate

//whenn this component is mounted the useEffect will run to fetch data

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [related, setRelated] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, cartItems } = useStateContext()

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    //fetch data has product data + related products data
    //in previous commit i have changed this file for some issues and used useEffect().
    
    const fetchData = async () => {
      const q1 = `*[_type == "product" && slug.current == $slug][0]`;
      const q2 = `*[_type == "product"]`;
      const [prod, rel] = await Promise.all([
        client.fetch(q1, { slug }),
        client.fetch(q2),
      ]);
      
      setProduct(prod);
      setRelated(rel);
      setLoading(false);
    }

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading…</p>;
  if (!product) return <p>Product not found.</p>;

  const { _id, name, price, details, image } = product;

  // convert ProductType to CartItem format by including quantity field
  const handleAddToCart = () => {
  onAdd({
    _id: _id || '',
    name: name || 'Unnamed Product',
    price: price || 0,
    image: image ?? [], // default to empty array if undefined
    quantity: qty,
  }, qty);
}
const handleCheckout = async ()=>{
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
     body: JSON.stringify([{
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty
        }])
    });
    if(response.status === 500) return

    const data = await response.json();

    toast.loading('Redirecting...')
//one instance of checkout
  //this will keep data of user even if they are gone so if the return and countinue with the   purchase they will be able to do so
    stripe?.redirectToCheckout( {sessionId: data.id})
  }


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              className='product-detail-image'
              src={image?.[index] ? urlFor(image[index]).url() : ''}
              alt={name ?? ''}    // if name is undefined, use empty string
              width={500}
              height={500}
            />
          </div>
          <div className="small-images-container">
            {/* carousel of images */}
            {image?.map((img, i) => (
              <div key={i} onMouseEnter={() => setIndex(i)}>
                <Image
                  src={urlFor(img).url()}
                  alt={`${name} ${i + 1}`}
                  width={100}
                  height={100}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                />
              </div> 
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews flex">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <div className="quantity-desc flex">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>

          <div className="buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now"onClick={handleCheckout}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container ">
            {related.map((item) => (
              <Product key={item._id} productProp={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
