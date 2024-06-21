import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

//Get PostponeExamAll
export const getPostponeExamAll = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}postpone/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get PostponeExam Only EmployeeId
export const getPostponeExam = () => {
  const token = Cookies.get('token');
  const decode = jwtDecode(token);
  const employeeId = decode.EmployeeId;
  return axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}postpone/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Create One Postpone
export const createPostponeExam = (formData) => {
  const token = Cookies.get('token');
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}postpone/create`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Detail Postpone
export const detailPostpone = (postponeExamId) => {
  const token = Cookies.get('token');
  return axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}Postpone/detail/${postponeExamId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// Update Postpone
export const updatePostpone = (formData) => {
  const token = Cookies.get('token');
  return axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}Postpone/update`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
