import React from 'react';
import { Navigate } from 'react-router-dom';

const GuestOnlyRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user_id');

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestOnlyRoute;
