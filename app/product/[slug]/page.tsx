// app/product/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../../../sanity/lib/client';
import Image from 'next/image';
import Product from '../../../components/Product';

import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai';
import type { Product as ProductType } from '../../../sanity.types';

export const dynamic = 'force-dynamic'; // (optional) always render on the server and rehydrate

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [related, setRelated] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const fetchData = async() => {
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

  const { name, price, details, image } = product;

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
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </div>
          </div>

          <div className="buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
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
