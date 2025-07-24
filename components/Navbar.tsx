'use client'
import Link from "next/link"
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/app/context/StateContext";
const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
  <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
 
  <div className="text-xl  text-gray-500">
    <Link href="/">Decibel Den</Link>
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