import axios from 'axios';
import Cookies from 'js-cookie';

//Get PostponeExamAll
export const getPostponeExamAll = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/PostponeExam/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get PostponeExam Only
export const getPostponeExam = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/PostponeExam/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
