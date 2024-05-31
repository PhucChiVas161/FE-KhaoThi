import axios from 'axios';
import Cookies from 'js-cookie';

// Get PostponeExamAll
export const getCourse = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/course/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const importCourse = (formData) => {
  const token = Cookies.get('token');
  return axios.post(`${import.meta.env.VITE_API_ENDPOINT}api/Course/import`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
