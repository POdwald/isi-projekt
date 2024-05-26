import React, { createContext, useState, useEffect } from 'react';
import { api, setAuthToken } from '../utils/apiService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      api.get('/profile/')
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/token/', { username, password });
      const { access: token } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      const userResponse = await api.get('/profile/');
      setUser(userResponse.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
