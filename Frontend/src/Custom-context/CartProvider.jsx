import React, { use } from 'react'
import { useEffect } from 'react';
import { createContext, useState, useContext, useReducer } from 'react'
import { useAuth } from './AuthProvider';
import { json } from 'zod';


const CartContext = createContext();



const cartReducer = (state, action) => {
  switch (action.type) {


    // providing the cart fetched from backend/DB  as initial ,

    case "SET_CART": {
      const newState = action.payload;
      console.log(' SETcART action >>>>>', newState);
      
      return newState;
     }



      case "ADD_TO_CART": {
       
          const cartItem = action.payload;
         
      console.log("Previous State:", state);
      console.log("Add to cart:", cartItem);

      

      const existingItem = state.find(item => item.productId === cartItem.productId);
      if (existingItem) {
        // itemexisted then increase qunty
        return state.map(item =>
          item.productId == action.payload.productId ? 
            { ...item, quantity: item.quantity + 1 } :
            item
        )
      }
      else {
        // if item is not existed add with quantity 1
        return [...state, {...action.payload,quantity:1}]
      }

     
      // add product in DB

    
    }

    case "REMOVE_FROM_CART": {
      const _id = action.payload;

          const newState = state.filter((item) => item.productId !== _id);
          return newState;
    }

    case "CLEAR_CART": {
      return [];
    }

    case "INCREMENT_CART": {
      const id = action.payload;
      

      const newState = state.map((item) =>
        item.productId.toString() === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );


      console.log("increaSed qynty............", newState);
          
          return newState;
    }

    case "DECREMENT_CART": {
      const id = action.payload.productId;

      const newState = state.map((item) =>
        item.productId === id && item.quantity > -1
          ? { ...item, quantity: item.quantity - 1 }
          : item
          );
          const filteredState = newState.filter(item => !(item.quantity == 0)); //removing the item with 0 qnty from cart list 

          console.log("**********decrease qnty******", filteredState);
          
          return filteredState;
    }

      default:
          return state;
  }
};



 // reducer always have to return newstate based on action type.



const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState([]);

  const [cartState, dispatch] = useReducer(cartReducer, cart); // useReducer hook for cart state managment (complex state managment)





  const { loggedInUserData } = useAuth();
  
  console.log("---------------Cart Provider", loggedInUserData);




  //defining actions for cart Reducer----------------------------------------------------


  //--------------------(Api-call)----------------------------------------------------
 const fetchCartByUserId = async (userId) => {
   try {
   
      if (!userId) return;
const res = await fetch(
  `${import.meta.env.VITE_API_URL}/cart/items/${loggedInUserData._id}`,
);
     const {data} = await res.json();
     

     //----------------- Set cart ---------------------

dispatch({
  type: "SET_CART",
  payload: data || []
});;
    }
    catch (error) {
     console.log("error fetching cart items", error);
   }
 };

  
  //-------------------------------------- Add to cart operation....--------------------------
  const AddToCart = async (product) => {
    try {
      // Update local state
      dispatch({ type: "ADD_TO_CART", payload: product });

      // Ensure user ID exists
      if (!loggedInUserData?._id) {
        console.error("User not logged in");
        return;
      }

      
      
      // Make POST request
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/add/${loggedInUserData._id}`,
        {
          method: "POST",
          credentials: "include", // sends cookies if needed
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product), // FIXED: JSON.stringify (capital J)
        },
      );

      // Parse response (optional)
      const data = await response.json();
      console.log("Add to cart response:", data);

      // Optional: handle errors from server
      if (!response.ok) {
        console.error("Server error:", data.message || response.statusText);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };


  //----------------- Remove from cart operation ---------------------------------
  const RemoveFromCart = async (_id) => {
    try {
    console.log(_id);
    
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/delete/${loggedInUserData._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: _id }),
        },
      );

      const { data } =   await res.json();
      console.log("remove item from cart response ------>", data);

      dispatch({ type: "REMOVE_FROM_CART", payload: _id });
  } catch (error) {
    console.log("remove item from cart error---->", error);
    
  }
  }


// ----------------------------{CLEAR CART }----------------------------------------
  const ClearCart = async () => {

  
    dispatch({ type: "CLEAR_CART" })

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cart/items/clear/${loggedInUserData._id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    
    const response = await res.json();

    console.log("clear cart endpoint response------->", response);
    
  };


  //------------------------ Updating product quantity in cart operations ------------------------------

  const IncreamentCart = async (productId) => {
    dispatch({ type: "INCREMENT_CART", payload: productId });
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cart/item/increment/${loggedInUserData._id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      },
    );

    const response = await res.json();
    console.log("increment cart endpoint responso --->", response);
    
  }
   
  const DecrementCart = async (productId) => {
    dispatch({ type: "DECREMENT_CART", payload: productId });
     const res = await fetch(
       `${import.meta.env.VITE_API_URL}/cart/item/decrement/${loggedInUserData._id}`,
       {
         method: "POST",
         credentials: "include",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ productId }),
       },
     );

    const response = await res.json();
    console.log("Decrease quantity endpoint response ------->", response,);
    

  }


  // load the cart on first render
  useEffect(() => {
    if (loggedInUserData?._id) {
      fetchCartByUserId(loggedInUserData?._id);
    }
  }, [loggedInUserData]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        setCart,
        AddToCart,
        RemoveFromCart,
        IncreamentCart,
        DecrementCart,
        ClearCart,
      }}
    >
      {children}
    </CartContext.Provider> // providing cart Context using provider component and concept of children prop.
  );
}

export default CartProvider;

export const useCart = () => useContext(CartContext);     // custom hook to use cart context


