import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || ''

  if (!query) return NextResponse.json([])

  const sanityQuery = `
    *[_type == "product" && name match "${query}*" ]{
      _id,
      name,
      slug,
      price
    }
  `

  const products = await client.fetch(sanityQuery)
  return NextResponse.json(products)
}
