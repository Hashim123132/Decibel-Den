'use client'

import { useEffect, useState, Suspense } from 'react'

import { Product as ProductType, HeroCarousel as HeroCarouselType } from '../sanity.types'
import { client } from '../sanity/lib/client' 
import FooterBanner from '../components/FooterBanner'
import HeroBanner from '../components/HeroBanner'
import Product from '../components/Product'
import { BannerWithSlug } from '../components/BannerWithSlug';
import StripeSuccessToast from '../components/StripeSuccessToast'

const HomePage = () => {

  const [products, setProducts] = useState<ProductType[]>([])
  const [bannerData, setBannerData] = useState<BannerWithSlug[]>([])
  const [heroCarousel, setHeroCarousel] = useState<HeroCarouselType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Products
        const productsResult: ProductType[] = await client.fetch('*[_type == "product"]')
        setProducts(productsResult)

        // Banner
        const bannerResult: BannerWithSlug[] = await client.fetch(`*[_type == "banner"]{
          ...,
          image,
          product->{
            slug
          }
        }`)
        setBannerData(bannerResult)

        // Hero Carousel (resolved references with ->)
        const heroCarouselResult: HeroCarouselType | null = await client.fetch(`*[_type == "heroCarousel"][0]{
          title,
          banners[]->{
            _id,
            _createdAt,
            _rev,
            _updatedAt,
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
        }`)
        setHeroCarousel(heroCarouselResult || null)

      } catch (error) {
        console.error('Error fetching data:', error)
      }
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
        {products.map((product) => (
          <Product 
            key={product._id}
            productProp={product}
          />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData[0]} />
    </>
  )
}

export default HomePage
