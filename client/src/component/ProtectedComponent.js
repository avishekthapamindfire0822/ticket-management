import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContextProvider';
const ProtectedComponent = ({ children }) => {
  const { state } = useContext(AuthContext);
  console.log({ state });
  if (!state.auth?.isAuthenticated) {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedComponent;
