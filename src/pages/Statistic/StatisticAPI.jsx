import axios from 'axios';
import Cookies from 'js-cookie';

//Get ReasonRecheck
export const getReasonRecheck = (lopHPPrefix) => {
  const token = Cookies.get('token');
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}Statistic/reason-recheck`,
    lopHPPrefix,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Get ReasonPostpone
export const getReasonPostpone = (lopHPPrefix) => {
  const token = Cookies.get('token');
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}Statistic/reason-postpone`,
    lopHPPrefix,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Get SubjectRecheck
export const getSubjectRecheck = (lopHPPrefix) => {
  const token = Cookies.get('token');
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}Statistic/subject-recheck`,
    lopHPPrefix,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Get SubjectPostpone
export const getSubjectPostpone = (lopHPPrefix) => {
  const token = Cookies.get('token');
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}Statistic/subject-postpone`,
    lopHPPrefix,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Get StatusRecheck
export const getStatusRecheck = () => {
  const token = Cookies.get('token');
  return axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}Statistic/sum-recheck`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Get StatusPostpone
export const getStatusPostpone = () => {
  const token = Cookies.get('token');
  return axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}Statistic/sum-postpone`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
