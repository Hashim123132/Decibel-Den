import Link from 'next/link';
import {urlFor} from '../sanity/lib/client'
import Image from 'next/image';
import { BannerWithSlug } from '../ sanity.overrides';

type Props = {
  footerBanner: BannerWithSlug | null;
}


const FooterBanner = ({footerBanner}:Props) => {
  
    if (!footerBanner) return null;
    const{desc, largeText1, largeText2, saleTime, smallText, midText, discount, buttonText, image,product } = footerBanner
    // const imageUrl = image && image[0] ? urlFor(image[0]).url() : '';
  
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p >{saleTime}</p>

        </div>
        
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
       <Link href={`/product/${product?.slug?.current}`}>

          <button type='button'>
            {buttonText}
          </button>
        </Link>
        {/* we are importing image from banner schema not product schema */}
         <Image height={450} width={450} src={image? urlFor(image).url():''} alt="footer banner"
        className="footer-banner-image" />
        </div>
      </div>

    </div>
  )
}
export default FooterBanner