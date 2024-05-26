import { api, setAuthToken } from './apiService';

const login = async (username, password) => { // Assuming the backend expects username and password
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

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // Assuming you store the refresh token in local storage
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

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  setAuthToken(null);
};

export { login, refreshToken, logout };
