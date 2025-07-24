'use client'

import { useEffect, useState } from 'react'
import { Product as ProductType } from '../../sanity.types'
import { client } from '../../sanity/lib/client'
import Product from '../../components/Product'

const ProductDisplayPage = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const query = '*[_type == "product" && category == "speakers"]'
      const result = await client.fetch(query)
      setProducts(result)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="products-heading">
        <h2>All Products</h2>
        <p>Explore the collection</p>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} productProp={product} />
        ))}
      </div>
    </>
  )
}

export default ProductDisplayPage
