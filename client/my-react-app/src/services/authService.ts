import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // { token }
  } catch (error: unknown) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
