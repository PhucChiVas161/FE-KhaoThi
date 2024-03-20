import axios from 'axios';
import Cookies from 'js-cookie';

//Get PostponeExamAll
export const getPostponeExamAll = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/postpone/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get PostponeExam Only
export const getPostponeExam = (employeeId) => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/postpone/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Create One Postpone
export const createPostponeExam = (formData) => {
  const token = Cookies.get('token');
  return axios.post(`${import.meta.env.VITE_API_ENDPOINT}api/postpone/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
