import axios from 'axios';
import { signIn, signUp, fetchUsers } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  it('should sign in and return token', async () => {
    const mockResponse = { data: { token: 'test-token' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const response = await signIn('test@example.com', 'password123');
    expect(response.data.token).toBe('test-token');
    expect(mockedAxios.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should throw an error if sign in fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Sign in failed'));

    await expect(signIn('test@example.com', 'wrongpassword')).rejects.toThrow('Sign in failed');
  });

  it('should sign up successfully', async () => {
    const mockResponse = { data: { id: 1, token: 'test-token' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const response = await signUp('test@example.com', 'password123');
    expect(response.data.token).toBe('test-token');
    expect(mockedAxios.post).toHaveBeenCalledWith('/register', {
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should fetch users successfully', async () => {
    const mockResponse = {
      data: {
        page: 2,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: [
          { id: 7, first_name: 'Michael', last_name: 'Lawson', email: 'michael.lawson@reqres.in', avatar: 'https://reqres.in/img/faces/7-image.jpg' },
          { id: 8, first_name: 'Lindsay', last_name: 'Ferguson', email: 'lindsay.ferguson@reqres.in', avatar: 'https://reqres.in/img/faces/8-image.jpg' },
          { id: 9, first_name: 'Tobias', last_name: 'Funke', email: 'tobias.funke@reqres.in', avatar: 'https://reqres.in/img/faces/9-image.jpg' },
          { id: 10, first_name: 'Byron', last_name: 'Fields', email: 'byron.fields@reqres.in', avatar: 'https://reqres.in/img/faces/10-image.jpg' },
          { id: 11, first_name: 'George', last_name: 'Edwards', email: 'george.edwards@reqres.in', avatar: 'https://reqres.in/img/faces/11-image.jpg' },
          { id: 12, first_name: 'Rachel', last_name: 'Howell', email: 'rachel.howell@reqres.in', avatar: 'https://reqres.in/img/faces/12-image.jpg' }
        ],
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const response = await fetchUsers(2);
    expect(response.data.data).toHaveLength(6);
    expect(mockedAxios.get).toHaveBeenCalledWith('/users?page=2');
  });
});
