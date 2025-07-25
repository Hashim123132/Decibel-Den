'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Product as ProductType } from '../sanity.types'

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ProductType[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (!value.trim()) {
      setResults([])
      return
    }

    const res = await fetch(`/api/search?query=${value}`)
    const data = await res.json()
    setResults(data)
  }

  // 🔻 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setQuery("")
        setResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <Input
        placeholder="Search for products..."
        value={query}
        onChange={handleSearch}
      />

      {query && (
        <ul className="absolute z-10 bg-white shadow-md border w-full mt-1 rounded max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((product: ProductType) =>
              product.slug?.current ? (
                <li key={product._id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link href={`/product/${product.slug.current}`}>
                    {product.name}
                  </Link>
                </li>
              ) : null
            )
          ) : (
            <li className="px-4 py-2 text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
