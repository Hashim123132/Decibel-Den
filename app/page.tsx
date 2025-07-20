'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { Product as ProductType, Banner as BannerType } from '../sanity.types'
//we have created a sanity.types folder which makes interface of Product based on schemaType

import { client } from '../sanity/lib/client' 
import FooterBanner from '../components/FooterBanner'
import HeroBanner from '../components/HeroBanner'
import Product from '../components/Product'



const HomePage = () => {

  const searchParams = useSearchParams()

  const [products, setProducts] = useState<ProductType[]>([])
  const [bannerData, setBannerData] = useState<BannerType[]>([])

  // stripe success toast
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment successful!')
    }
  }, [searchParams])

  // fetch data from sanity
  useEffect(() => {
    const fetchData = async () => {
      const queryProducts = '*[_type == "product"]'
      const queryBanner = '*[_type == "banner"]'

      const productsResult = await client.fetch(queryProducts)
      const bannerResult = await client.fetch(queryBanner)

      setProducts(productsResult)
      setBannerData(bannerResult)
    }

    fetchData()
  }, [])

  return (
    <>
      <HeroBanner heroBanner={bannerData.length > 0 ? bannerData[0] : null} />
      
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
