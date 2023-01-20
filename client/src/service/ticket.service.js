import axiosInstance from '../config/axios-config';
import API_URL_CONSTANTS from '../constants/api-url.constants';

const getTickets = async (token) => {
  return axiosInstance.get(API_URL_CONSTANTS.TICKET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createTicket = async (ticketDetail) => {
  return axiosInstance.post(API_URL_CONSTANTS.TICKET, {
    ...ticketDetail,
  });
};

const deleteTicket = async (token, ticketId) => {
  return axiosInstance.delete(`${API_URL_CONSTANTS.TICKET}/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const markTicketAsComplete = async (token, ticketId, ticketStatus) => {
  return axiosInstance.put(
    `${API_URL_CONSTANTS.TICKET}/${ticketId}`,
    {
      status: ticketStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
