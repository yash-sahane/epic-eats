import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';

const ProtectedRoute = () => {
  const { token, setAuthPopup } = useStoreContext();

  if (!token) {
    setAuthPopup('login');
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;