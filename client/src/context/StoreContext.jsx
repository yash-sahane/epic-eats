import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    if (cartItems[id]) {
      setCartItems(prev => ({ ...prev, [id]: prev[id] + 1 }));
    } else {
      setCartItems(prev => ({ ...prev, [id]: 1 }))
    }
  }

  const removeFromCart = (id) => {
    setCartItems(prev => ({ ...prev, [id]: prev[id] - 1 }));
  }

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemDetails = food_list.find(product => product._id === item);
        totalAmount += itemDetails.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = { food_list, cartItems, addToCart, removeFromCart, getTotalAmount };

  return <StoreContext.Provider value={contextValue}>
    {children}
  </StoreContext.Provider>
}

const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreContextProvider, useStoreContext };