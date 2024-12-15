import axios from 'axios';

// Backend API instance
const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL of your backend
});

// Automatically attach token to headers if it exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // JWT Token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
