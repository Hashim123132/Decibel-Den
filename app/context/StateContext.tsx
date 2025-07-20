'use client'
//this component is used as context for useState hook so we don't need to make useState again and again
//we are using many useState hooks and they can be used globally 

import { createContext, useState, useContext } from 'react'
import { toast } from 'sonner';

//type for createContext 
type AppContextType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  totalQuantities: number;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
  qty: number;
  onAdd: (product: CartItem, quantity: number) => void;
  incQty: () => void;
  decQty: () => void;
  toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void;
   onRemove: (product: CartItem) => void;
};

type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
  image: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }[]
}

const Context = createContext<AppContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  //for toggling cart menu
  const [showCart, setShowCart] = useState(false);

  //for tracking list of items in Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //for tracking total price
  const [totalPrice, setTotalPrice] = useState(0);

  //The total number of items across all products in the cart.
  const [totalQuantities, setTotalQuantities] = useState(0);

  // This creates a state variable to track how many units of a product the user wants to add to the cart this setFuntion can directly be used but it is better that we make helper function
  const [qty, setQty] = useState(1)

  //This is a helper function that increases qty by 1 when the user clicks a “+” button.
  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  //This is a helper function that decreases qty by 1 when the user clicks a “–” button. Minimum = 1
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    })
  }

  //on Adding multiple items combine their price
  const onAdd = (product: CartItem, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    //Take the current total price (prevTotalPrice) and add the price of the new product(s) being added to the cart
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)

    //It updates the total number of items in the cart, by adding the quantity of the current product being added.
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      // The product is already in the cart.
      // So instead of adding it again, you want to update its quantity.

      const updatedCartItems = cartItems.map((cartProduct) => {
        //if we found user adding same cartProduct then we update the item quantity    
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        //we are mapping over an array return other product as is
        return cartProduct;
      })
      setCartItems(updatedCartItems);

    } else {
      product.quantity = quantity;

      //since react state cannot be mutated directly we use spread operator which makes a new array
      //of All the existing items in cartItems
      // Plus the new item being added (product)with new included field quantity
      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${quantity} ${product.name} added to cart.`, {
      className: "toast-success",
      style: {
        backgroundColor: "white",
        color: "#222",
      }
    });
  }
// to remove the number of items from cart
const onRemove = (product: CartItem) => {
    const foundProduct = cartItems.find((item)=> item._id === product._id);
  const newCartItems = cartItems.filter((item) => item._id !== product._id);
 
 
  //typesafe
  if (!foundProduct) return null;

    setTotalPrice ((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)

    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)

    setCartItems(newCartItems)
  }

// the quantity add or delete button in Cart
  const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec') => {
    const foundProduct = cartItems.find((item) => item._id === id);
    if (!foundProduct) return;

    if (value === 'inc') {
      const updatedItems = cartItems.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);

    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        const updatedItems = cartItems.map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStateContext must be used inside a StateContext provider');
  }
  return context;
};
