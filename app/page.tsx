'use client'

import { useEffect, useState, Suspense } from 'react'

import { Product as ProductType } from '../sanity.types'
//we have created a sanity.types folder which makes interface of Product based on schemaType

import { client } from '../sanity/lib/client' 
import FooterBanner from '../components/FooterBanner'
import HeroBanner from '../components/HeroBanner'
import Product from '../components/Product'
import { BannerWithSlug } from '../components/BannerWithSlug';
import StripeSuccessToast from '../components/StripeSuccessToast'

const HomePage = () => {

  const [products, setProducts] = useState<ProductType[]>([])
  const [bannerData, setBannerData] = useState<BannerWithSlug[]>([])
  const [heroCarousel, setHeroCarousel] = useState<any>(null) // state for heroCarousel

  // stripe success toast
 
  // fetch data from sanity
  useEffect(() => {
    const fetchData = async () => {
      const queryProducts = '*[_type == "product"]'
    
      //for banner
      const queryBanner = `*[_type == "banner"]{
        ...,
        image,
        product->{
          slug
        }
      }`

      //for hero carousel
      const queryHeroCarousel = `*[_type == "heroCarousel"][0]{
        title,
        banners[]->{
          image,
          buttonText,
          product->{ slug },
          desc,
          smallText,
          midText,
          largeText1,
          largeText2,
          discount,
          saleTime
        }
      }`

      const productsResult = await client.fetch(queryProducts)
      const bannerResult = await client.fetch(queryBanner)
      const heroCarouselResult = await client.fetch(queryHeroCarousel)

      setProducts(productsResult)
      setBannerData(bannerResult)
      setHeroCarousel(heroCarouselResult)
    }

    fetchData()
  }, [])

  return (
    <>
      <HeroBanner heroCarousel={heroCarousel} />
      <Suspense fallback={null}>
        <StripeSuccessToast />
      </Suspense>
       
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      
      <div className="products-container">
        {/* mapped products should go in Product component by using productProp which have value of whole object element of array (named product also) */}
        {products?.map((product) => (
          <Product 
            key={product._id}
            productProp={product}
          />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export default HomePage
