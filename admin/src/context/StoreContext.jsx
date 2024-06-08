import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URI } from '../main';

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authPopup, setAuthPopup] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const contextValue = { token, setToken, authPopup, setAuthPopup };

  return <StoreContext.Provider value={contextValue}>
    {children}
  </StoreContext.Provider>
}

const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreContextProvider, useStoreContext };