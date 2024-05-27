import axios from 'axios';
import backendUrl from '../utils/config';

const api = axios.create({
    baseURL: `${backendUrl}/api`,
});

// Function to set authorization header with JWT token
const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export { api, setAuthToken };