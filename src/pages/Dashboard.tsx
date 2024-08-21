import React, { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { fetchUsers } from '../services/api';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers(2); // Fetch users from page 2
        setUsers(response.data.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">User List:</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li
              key={user.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow"
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
