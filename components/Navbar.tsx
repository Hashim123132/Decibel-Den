'use client'

import Link from "next/link"
import { AiOutlineShopping } from "react-icons/ai"
import Cart from "./Cart"
import { useStateContext } from "@/app/context/StateContext"
import { MobileNav } from "./MobileNav"
import SearchBar from "./SearchBar"

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md flex-wrap gap-2">
      
      {/* Left: Logo & MobileNav (always show MobileNav, hide logo on small screens) */}
      <div className="flex items-center gap-4">
        <MobileNav />
        <Link href="/" className="hidden md:block text-xl font-semibold">
          Decibel Den
        </Link>
      </div>

      {/* Middle: Nav links - only show on md+ screens */}
      <div className="hidden md:flex gap-6">
        <Link href="/ProductDisplayPage" className="logo">Products</Link>
        <Link href="/Headphones" className="logo">Headwear</Link>
        <Link href="/Speakers" className="logo">Speakers</Link>
      </div>

      {/* Search Bar - always visible */}
      <div className="flex-1 max-w-md w-full">
        <SearchBar />
      </div>

      {/* Right: Cart icon - always visible */}
      <div className="relative">
        <button
          type="button"
          className="relative cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping size={24} />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
