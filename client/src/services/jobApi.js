import axios from 'axios';

const api = axios.create({ baseURL: '/api/jobs' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const searchJobs = async ({ q = '', location = '', sources } = {}) => {
  const { data } = await api.get('/search', { params: { q, location, sources } });
  return data;
};
