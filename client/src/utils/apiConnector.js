import axios from 'axios';

const API_URL = 'http://localhost:5001/api';


const api = axios.create({
  baseURL: API_URL,
});



export const apiService = {
  // Theme functions
  getThemes: () => api.get('/themes'),

  // Product functions
  getProductsByTheme: (themeId) => api.get(`/products/by-theme/${themeId}`),
  getProductById: (id) => api.get(`/products/${id}`),
};