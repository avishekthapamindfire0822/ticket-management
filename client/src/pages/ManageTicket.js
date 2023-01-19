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
  return (
    <header>
      <NavMenu newTicketAddedCallback={newTicketAddedCallback} />
      {!ticketState.loading &&
      Array.isArray(ticketState.data) &&
      ticketState.data.length > 0 ? (
        <TicketList tickets={ticketState.data} />
      ) : null}
    </header>
  );
};

export default ManageTicket;
