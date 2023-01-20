import React, { useContext, useEffect, useState } from 'react';
import NavMenu from '../component/nav/NavMenu';
import TicketList from '../component/ticket/TicketList';
import { AuthContext } from '../context/AuthContextProvider';
import { getITStaff, getTickets } from '../service/ticket.service';

const ManageTicket = () => {
  const { state } = useContext(AuthContext);
  const [ticketState, setTicketState] = useState({
    loading: false,
    error: null,
    data: null,
    staffMembers: null,
  });
  console.log({ ticketState });
  useEffect(() => {
    Promise.allSettled([getTickets(state.token), getITStaff(state.token)])
      .then((result) => {
        const [ticketResult, stattMemberResult] = result;
        console.log({ ticketResult, stattMemberResult });
        setTicketState((prevState) => ({
          ...prevState,
          data: ticketResult.value.data.data,
          staffMembers: stattMemberResult.value.data.data,
        }));
      })
      .catch((err) => {});
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

  const postNewCommentCallback = (ticketId, newComment) => {
    setTicketState((prevState) => ({
      ...prevState,
      data: prevState.data.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, comments: [...ticket.comments, newComment] }
          : ticket
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

  const assignedTicketCallback = ({ ticketId, ...ticketAssignDetail }) => {
    setTicketState((prevState) => ({
      ...prevState,
      data: prevState.data.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, assignedTo: ticketAssignDetail }
          : ticket
      ),
    }));
  };
  return (
    <header>
      <NavMenu newTicketAddedCallback={newTicketAddedCallback} />
      {!ticketState.loading &&
      Array.isArray(ticketState.data) &&
      Array.isArray(ticketState.staffMembers) &&
      ticketState.data.length > 0 &&
      ticketState.staffMembers.length > 0 ? (
        <TicketList
          tickets={ticketState.data}
          staffMembers={ticketState.staffMembers}
          deleteTicketCallback={deleteTicketCallback}
          ticketUpdateCallback={ticketUpdateCallback}
          postNewCommentCallback={postNewCommentCallback}
          assignedTicketCallback={assignedTicketCallback}
        />
      ) : null}
      {ticketState.error && <p></p>}
    </header>
  );
};

export default ManageTicket;
