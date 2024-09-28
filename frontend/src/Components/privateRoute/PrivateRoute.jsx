import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ element }) => {
  const [cookies] = useCookies(['token']);
  return cookies.token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
