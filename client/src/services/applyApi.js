import axios from 'axios';

const api = axios.create({ baseURL: '/api/apply' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const applyToJob = async (job) => {
  const { data } = await api.post('/', job);
  return data;
};

export const getAppliedJobs = async () => {
  const { data } = await api.get('/');
  return data;
};

export const updateApplicationStatus = async (id, status) => {
  const { data } = await api.patch(`/${id}/status`, { status });
  return data;
};
