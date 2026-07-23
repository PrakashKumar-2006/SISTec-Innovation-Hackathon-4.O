import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/admin` 
  : '/api/admin';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
      // A gentle reload redirects to login via AuthGuard safely without circular dependencies
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
