import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api`,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};



export const apiService = {
  // Auth
  login: (data) => api.post('/auth/login', data),
  signup: (data) => api.post('/auth/signup', data),

  // Theme functions
  getThemes: () => api.get('/themes'),
  createTheme: (data) => api.post('/themes', data),

  // Product functions
  getProductsByTheme: (themeId) => api.get(`/products/by-theme/${themeId}`),
  getProductById: (id) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getAllProducts: () => api.get('/products'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),

  // Contact functions
  sendContactMessage: (formData) => api.post('/contact', formData),
};