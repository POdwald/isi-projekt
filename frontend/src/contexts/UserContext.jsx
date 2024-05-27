import { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/apiService';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access isAuthenticated from AuthContext
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile(); // Fetch user profile data only if authenticated
    } else {
      setUser(null); // Clear user data if not authenticated
    }
  }, [isAuthenticated]); // Refresh user profile data when isAuthenticated changes

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
