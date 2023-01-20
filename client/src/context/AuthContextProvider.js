import React, { useReducer } from 'react';
import { createContext } from 'react';
import authReducer from '../reducer/auth-reducer';
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: sessionStorage.getItem('token'),
    fullName: sessionStorage.getItem('fullName'),
  });
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
