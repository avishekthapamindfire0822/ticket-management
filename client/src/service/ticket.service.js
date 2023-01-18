import axiosInstance from '../config/axios-config';
import API_URL_CONSTANTS from '../constants/api-url.constants';

const getTickets = async (token) => {
  return axiosInstance.get(API_URL_CONSTANTS.GET_USER_TICKETS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getTickets };
