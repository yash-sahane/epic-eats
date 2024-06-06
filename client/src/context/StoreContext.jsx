import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URI } from '../main';

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [foodList, setFoodList] = useState([]);
  const [authPopup, setAuthPopup] = useState(null);

  console.log(SERVER_URI);
  const addToCart = async (id) => {
    try {
      const { data } = await axios.post(`${SERVER_URI}/api/cart/add`, { itemId: id }, {
        headers: { token }
      })
      if (data.success) {
        toast.success(data.message);

        if (cartItems[id]) {
          setCartItems(prev => ({ ...prev, [id]: prev[id] + 1 }));
        } else {
          setCartItems(prev => ({ ...prev, [id]: 1 }))
        }
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

  const removeFromCart = async (id) => {
    try {
      const { data } = await axios.post(`${SERVER_URI}/api/cart/remove`, { itemId: id }, {
        headers: { token }
      })
      if (data.success) {
        if (cartItems[id] > 1) {
          setCartItems(prev => ({ ...prev, [id]: prev[id] - 1 }));
        } else {
          const updatedCartItems = { ...cartItems };
          delete updatedCartItems[id];
          setCartItems(updatedCartItems);
        }
        toast.success(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

  const getCartData = async (token) => {
    try {
      const { data } = await axios.get(`${SERVER_URI}/api/cart/get`, {
        headers: { token }
      })
      if (data.success) {
        setCartItems(data.cartData);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

  const fetchFoodList = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URI}/api/food/list`);
      setFoodList(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      getCartData(token)
    }
    fetchFoodList();
  }, []);

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemDetails = foodList.find(product => product._id === item);
        totalAmount += itemDetails?.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = { authPopup, setAuthPopup, foodList, cartItems, addToCart, removeFromCart, getTotalAmount, token, setToken, foodList, setFoodList };

  return <StoreContext.Provider value={contextValue}>
    {children}
  </StoreContext.Provider>
}

const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreContextProvider, useStoreContext };