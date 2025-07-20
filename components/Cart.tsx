'use client'

import { useStateContext } from "@/app/context/StateContext"
import { urlFor } from "@/sanity/lib/client"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from "react-icons/ai"
import { TiDeleteOutline } from "react-icons/ti"
import getStripe from '../lib/getStripe'
import { toast } from "sonner"





const Cart = () => {
  //we have made a request to backend also made code their to accept it 
  const handleCheckout = async ()=>{
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(cartItems)
    });
    if(response.status === 500) return

    const data = await response.json();

    toast.loading('Redirecting...')
//one instance of checkout
  //this will keep data of user even if they are gone so if the return and countinue with the   purchase they will be able to do so
    stripe?.redirectToCheckout( {sessionId: data.id})
  }

  const cartRef = useRef<HTMLDivElement>(null)
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext(); 
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" 
         className="cart-heading"
         onClick={()=> setShowCart(false)}>
          <AiOutlineLeft/>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
          
         </button>
         {/* if we donot have any Cart Items */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h1 className="">Your shopping bag is empty </h1>
            <Link href='/'>
             
              <button type="button" onClick={() => setShowCart(false)} className="btn">
                Countinue Shopping
              </button>
            
            </Link>
          </div>
        )}

        {/* if we have product in cart items  show through this code in add-to-cart menu*/}
     <div className="product-container">
      {cartItems.length >= 1 && cartItems.map((item) => (
        <div className="product" key={item._id}>
          <Image
            src={urlFor(item?.image[0]).url()}
            width={250}
            height={250}
            className="cart-product-image"
            alt="cart item"
          />

      <div className="item-desc">
      
      {/* mapped item name and price */}
        
        <div className="flex ">
          <h4 className="font-bold">{item.name}</h4>
          <h5>${item.price}</h5>
        </div>

        <div className="flex bottom">
          <div>
            <p className="quantity-desc">
             {/* deleting quantity of values from cart */}
              <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                <AiOutlineMinus />
              </span>
             {/* number of quantities */}
              <span className="num">{item.quantity}</span>
             {/* adding more values in cart for product */}
              <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {/* deletion button */}
          <button type="button" onClick={()=>onRemove(item)} className="remove-item">
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
          {/* to show subtotal in cart menu of selected items below */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3 className="font-bold">Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>Pay with Stripe </button>
            </div>
          </div>
        )}

      </div>


    </div>
  )
}
export default Cart