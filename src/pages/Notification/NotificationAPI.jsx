import axios from 'axios';
import Cookies from 'js-cookie';

//Get NotificationAll
export const getNotificationAll = () => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}Notis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Get NotificationById
export const getNotificationById = (id) => {
  const token = Cookies.get('token');
  return axios.get(`${import.meta.env.VITE_API_ENDPOINT}Notis/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Create Notification
export const createNotification = (formData) => {
  const token = Cookies.get('token');
  return axios.post(`${import.meta.env.VITE_API_ENDPOINT}Notis`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Delete Notification
export const deleteNotification = (id) => {
  const token = Cookies.get('token');
  return axios.delete(`${import.meta.env.VITE_API_ENDPOINT}Notis/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Update Notification
export const updateNotification = (formData) => {
  const token = Cookies.get('token');
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}Notis/update`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
