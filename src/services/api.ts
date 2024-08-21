import axios, { AxiosResponse } from "axios";

const API = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const signIn = async (email: string, password: string): Promise<AxiosResponse> => {
  try {
    return await API.post('/login', { email, password });
  } catch (error) {
    console.error('Sign In Error:', error);
    throw error; 
  }
};

export const signUp = async (email: string, password: string): Promise<AxiosResponse> => {
  try {
    return await API.post('/register', { email, password });
  } catch (error) {
    console.error('Sign Up Error:', error);
    throw error; 
  }
};

export const fetchUsers = async (page: number = 1): Promise<AxiosResponse> => {
  try {
    return await API.get(`/users?page=${page}`);
  } catch (error) {
    console.error('Fetch Users Error:', error);
    throw error; 
  }
};
