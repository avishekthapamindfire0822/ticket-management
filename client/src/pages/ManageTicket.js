import React, { useContext, useEffect, useState } from 'react';
import NavMenu from '../component/nav/NavMenu';
import TicketList from '../component/ticket/TicketList';
import { AuthContext } from '../context/AuthContextProvider';
import { getTickets } from '../service/ticket.service';

const ManageTicket = () => {
  const { state } = useContext(AuthContext);
  const [ticketState, setTicketState] = useState({
    loading: false,
    error: null,
  });
  useEffect(() => {
    getTickets(state.token)
      .then((res) => {
        setTicketState((prevState) => ({
          ...prevState,
          data: res.data.data.tickets,
        }));
      })
      .catch((err) => {
        setTicketState((prevState) => ({
          ...prevState,
          error: err,
        }));
      });
  }, [state.token]);
  const newTicketAddedCallback = (newTicket) => {
    setTicketState((prevState) => ({
      ...prevState,
      data: [newTicket, ...prevState.data],
    }));
  };
  const deleteTicketCallback = (ticketId) => {
    setTicketState((prevState) => ({
      ...prevState,
      data: prevState.data.filter(({ _id }) => _id !== ticketId),
    }));
  };

  const postNewCommentCallback = (ticketId, newComments) => {
    setTicketState((prevState) => ({
      ...prevState,
      data: prevState.data.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, comments: newComments } : ticket
      ),
    }));
  };

  const ticketUpdateCallback = (ticketId) => {
    setTicketState((prevState) => ({
      ...prevState,
      data: prevState.data.map((ticket) =>
        ticket._id === ticketId
          ? {
              ...ticket,
              status: 'FIXED',
            }
          : ticket
      ),
    }));
  };
  return (
    <header>
      <NavMenu newTicketAddedCallback={newTicketAddedCallback} />
      {!ticketState.loading &&
      Array.isArray(ticketState.data) &&
      ticketState.data.length > 0 ? (
        <TicketList
          tickets={ticketState.data}
          deleteTicketCallback={deleteTicketCallback}
          ticketUpdateCallback={ticketUpdateCallback}
          postNewCommentCallback={postNewCommentCallback}
        />
      ) : null}
    </header>
  );
};

export default ManageTicket;
