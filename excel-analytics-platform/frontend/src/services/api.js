import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const uploadFile = (formData) => api.post('/file/upload', formData);
export const fetchHistory = (userId) => api.get(`/file/history/${userId}`);
export const saveUpload = (data) => api.post(`/file/history`, data);




