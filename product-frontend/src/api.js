import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api1/prod";

// Core CRUD Operations
export const getProducts = () => axios.get(`${API_BASE_URL}/all`);
export const getProductById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const addProduct = (product) => axios.post(`${API_BASE_URL}/add`, product);
export const updateProduct = (product) => axios.put(`${API_BASE_URL}/update`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/delete/${id}`);

// Specialized Search Operations
export const getByName = (name) => axios.get(`${API_BASE_URL}/name/${name}`);
export const getByPriceRange = (min, max) => axios.get(`${API_BASE_URL}/price-range/${min}/${max}`);
export const getByBrand = (brand) => axios.get(`${API_BASE_URL}/brand/${brand}`);