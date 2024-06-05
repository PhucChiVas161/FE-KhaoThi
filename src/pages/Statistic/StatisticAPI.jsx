import axios from 'axios';
import Cookies from 'js-cookie';

//Get ReasonRecheck
export const getReasonRecheck = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Statistic/reason-recheck`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Get ReasonPostpone
export const getReasonPostpone = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Statistic/reason-postpone`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Get SubjectRecheck
export const getSubjectRecheck = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Statistic/subject-recheck`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Get SubjectPostpone
export const getSubjectPostpone = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Statistic/subject-postpone`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Get StatusRecheck
export const getStatusRecheck = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Statistic/sum-recheck`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Get StatusPostpone
export const getStatusPostpone = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}api/Statistic/sum-postpone`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
