'use client'
import Link from "next/link"
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/app/context/StateContext";
import { MobileNav } from "./MobileNav";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
  <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
 
  <div className="custom-nav">
    <MobileNav />
    <Link href="/" className="hidden md:block">Decibel Den</Link>
  </div>

        <div className="nav-btns">

              <p className="logo">

                <Link href="/ProductDisplayPage" >
                  Products
                </Link>
         
              </p>
          <p className="logo">

            <Link href="/Headphones">
              Headwear
            </Link>
          </p>

           <p className="logo">

            <Link href="/Speakers">
              Speakers
            </Link>
          </p>
       <div className="relative w-full max-w-sm mx-auto">
          <Search className="absolute left-37 top-2 h-5 w-5 text-gray-400 " />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10 rounded-xl "
          />
        </div>
      </div>

        <button
          type="button"
          className="relative cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping size={24} />
          <span className=" cart-item-qty">
            {totalQuantities}
          </span>
        </button>
      {showCart && <Cart />}
    </div>
  )
}
export default Navbar