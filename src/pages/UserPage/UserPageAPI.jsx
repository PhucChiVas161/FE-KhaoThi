import axios from 'axios';
import Cookies from 'js-cookie';

// Get User
export const getUsers = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// GetOneUser
export const getOneUsers = (employeeId) => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// GetUserByLecturer
export const getUsersLecturer = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/employees/lecturer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete User
export const deleteUsers = (employeeId) => {
  const token = Cookies.get('token');
  const csrf = Cookies.get('csrf');
  return axios.delete(`${import.meta.env.VITE_API_ENDPOINT}api/Employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-CSRF-TOKEN': csrf,
    },
    withCredentials: true,
  });
};

// Import User
export const importUsers = (formData) => {
  const token = Cookies.get('token');
  const csrf = Cookies.get('csrf');
  return axios.post(`${import.meta.env.VITE_API_ENDPOINT}api/Accounts/import/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-CSRF-TOKEN': csrf,
      'Content-Type': 'multipart/form-data',
    },
  });
};
