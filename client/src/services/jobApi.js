import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';
const api = axios.create({ baseURL: `${BASE_URL}/api/jobs` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const searchJobs = async ({ q = '', location = '', sources } = {}) => {
  const { data } = await api.get('/search', { params: { q, location, sources } });
  return data;
};
