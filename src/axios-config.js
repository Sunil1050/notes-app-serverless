// axios-config.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add x-api-key header to every request
    config.headers['x-api-key'] = import.meta.env.VITE_API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
