//making hero banner the top banner you can refer to css styling in global css
//herobanner is a prop coming from page.tsx with some values(these values are from database of sanity) here it has a type of banner (because typescritpt wants to know the type of prop).It is also an object

import { Banner } from '../sanity.types';
import {urlFor} from '../sanity/lib/client'
type Props = {
  heroBanner: Banner | null;
};

import Link from "next/link"

const HeroBanner = ({ heroBanner }: Props) => {
 
  if (!heroBanner) return null;
 
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>

        <img  src={heroBanner.image ? urlFor(heroBanner.image).url() : ''}alt="headphone"
        className="hero-banner-image" />
      
      <div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
        
        </Link>
        <div className="desc">
          <h5>Descriptiom</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
      </div>
    </div>
  )
}
export default HeroBanner
