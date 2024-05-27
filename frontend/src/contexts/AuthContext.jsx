import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken } from '../utils/apiService';
import { login as loginService, logout as logoutService,  } from '../utils/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const success = await loginService(username, password); // Use loginService to authenticate
      if (success) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    logoutService();
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;