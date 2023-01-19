import axiosInstance from '../config/axios-config';
import API_URL_CONSTANTS from '../constants/api-url.constants';

const getTickets = async (token) => {
  return axiosInstance.get(API_URL_CONSTANTS.GET_USER_TICKETS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createTicket = async (token, ticketDetail) => {
  return axiosInstance.post(
    API_URL_CONSTANTS.TICKET,
    {
      ...ticketDetail,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteTicket = async (token, ticketId) => {
  return axiosInstance.delete(`${API_URL_CONSTANTS.TICKET}/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const markTicketAsComplete = async (token, ticketId) => {
  return axiosInstance.put(`${API_URL_CONSTANTS.TICKET}/${ticketId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postCommentOnTicket = async (token, ticketId, comment) => {
  return axiosInstance.post(
    `${API_URL_CONSTANTS.TICKET}/${ticketId}/${API_URL_CONSTANTS.COMMENTS}`,
    {
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getITStaff = async (token) => {
  return axiosInstance.get(API_URL_CONSTANTS.USERS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const assignTicketToStaff = async (token, ticketId, emailId) => {
  return axiosInstance.post(
    `${API_URL_CONSTANTS.TICKET}/${ticketId}/assign`,
    {
      emailId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export {
  getTickets,
  createTicket,
  deleteTicket,
  markTicketAsComplete,
  postCommentOnTicket,
  getITStaff,
  assignTicketToStaff,
};
