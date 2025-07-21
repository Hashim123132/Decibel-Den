//making hero banner the top banner you can refer to css styling in global css
//herobanner is a prop coming from page.tsx with some values(these values are from database of sanity) here it has a type of banner (because typescritpt wants to know the type of prop).It is also an object

import Image from 'next/image';
import { BannerWithSlug } from '../ sanity.overrides';
import {urlFor} from '../sanity/lib/client'

type Props = {
  heroBanner: BannerWithSlug | null;
};

import Link from "next/link"
import { useEffect, useState } from 'react';

const HeroBanner = ({ heroBanner }: Props) => {
 

   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = heroBanner?.images || [];
// Auto slide every 4 seconds
   useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!heroBanner) return null;
  

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
          {/* images are comming from banner schema */}
        
        {heroBanner.slides?.map((slide, index) => (
        <div key={index}>
          
            <Image
              src={urlFor(slide.image).url()}
              alt={`Slide ${index + 1}`}
              width={450}
              height={450}
            />
          {slide.product?.slug?.current && (
            <Link href={`/product/${slide.product.slug.current}`}>
              <button>{slide.buttonText || 'View Product'}</button>
            </Link>
          )}
        </div>
      ))}

        
        
        {/* <Image width={450} height={450}  src={heroBanner.image ? urlFor(heroBanner.image).url() : ''}alt="headphone"
        className="hero-banner-image" /> */}
      
      <div>
      <Link href={`/product/${heroBanner.product?.slug?.current}`}>
        <button type="button">{heroBanner.buttonText}</button>
      </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
      </div>
    </div>
  )
}
export default HeroBanner
