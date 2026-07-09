import axios from 'axios';

const api = axios.create({ baseURL: '/api/auth' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/register', { name, email, password });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await api.post('/login', { email, password });
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get('/me');
  return data;
};
