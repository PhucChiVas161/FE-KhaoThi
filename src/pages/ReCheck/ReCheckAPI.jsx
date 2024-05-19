import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

//Get ReCheckAll
export const getReCheckExamAll = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/recheck/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get ReCheckByEmployeeId
export const getReCheckByEmployeeId = () => {
  const token = Cookies.get('token');
  const decode = jwtDecode(token);
  const employeeId = decode.EmployeeId;
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/ReCheck/student/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get ReCheckByLecturerId
export const getReCheckByLecturerId = () => {
  const token = Cookies.get('token');
  const decode = jwtDecode(token);
  const employeeId = decode.EmployeeId;
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/ReCheck/lecturer/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Create One ReCheck
export const createReCheck = (formData) => {
  const token = Cookies.get('token');
  return axios.post(`${import.meta.env.VITE_API_ENDPOINT}api/ReCheck/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Detail ReCheck
export const detailReCheck = (reCheckId) => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/ReCheck/detail/${reCheckId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Update ReCheck
export const updateReCheck = (formData) => {
  const token = Cookies.get('token');
  return axios.put(`${import.meta.env.VITE_API_ENDPOINT}api/ReCheck/update`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
