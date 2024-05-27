import { api, setAuthToken } from './apiService';

const login = async (username, password) => {
  try {
    const response = await api.post('/token/', { username, password });
    const { access: token } = response.data;
    setAuthToken(token);
    localStorage.setItem('token', token);
    return true; // Login successful
  } catch (error) {
    console.error('Error logging in:', error);
    return false; // Login failed
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  setAuthToken(null);
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/token/refresh/', { refresh: refreshToken });
    const { access: token } = response.data;
    setAuthToken(token);
    localStorage.setItem('token', token);
    return true; // Token refreshed successfully
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false; // Token refresh failed
  }
};

const signup = async (username, email, password) => {
  try {
    const response = await api.post('/signup/', { username, email, password });
    const { token } = response.data;
    setAuthToken(token);
    localStorage.setItem('token', token);
    return true
  } catch (error) {
    console.error('Error signing up:', error);
    return null; // Return null in case of signup failure
  }
};

export { login, logout, refreshToken, signup };
