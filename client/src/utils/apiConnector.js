import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api`,
});



export const apiService = {
  // Theme functions
  getThemes: () => api.get('/themes'),

  // Product functions
  getProductsByTheme: (themeId) => api.get(`/products/by-theme/${themeId}`),
  getProductById: (id) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),

  // Contact functions
  sendContactMessage: (formData) => api.post('/contact', formData),
};