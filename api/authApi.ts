import { api } from '../api/axios';

export const register = (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return api.post('/auth/register', data);
};

export const login = (data: {
  email: string;
  password: string;
}) => {
  return api.post('/auth/login', data);
};