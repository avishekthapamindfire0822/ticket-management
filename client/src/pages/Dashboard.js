import React, { useContext, useEffect, useState } from 'react';
import NavMenu from '../component//nav/NavMenu';
import TicketList from '../component/ticket/TicketList';
import { AuthContext } from '../context/AuthContextProvider';
import { getTickets } from '../service/ticket.service';

const Dashboard = () => {
  const { state } = useContext(AuthContext);
  const [ticketState, setTicketState] = useState({
    loading: false,
    error: null,
    data: null,
  });
  useEffect(() => {
    if (state.role === 'NORMAL_USER') {
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
    }
  }, [state.token, state.role]);
  const newTicketAddedCallback = (newTicket) => {
    if (state.role === 'IT_STAFF') {
      return;
    }
    setTicketState((prevState) => ({
      ...prevState,
      data: [newTicket, ...prevState.data],
    }));
  };
  return (
    <>
      <header>
        <NavMenu newTicketAddedCallback={newTicketAddedCallback} />
        {!ticketState.loading &&
        state.role === 'NORMAL_USER' &&
        Array.isArray(ticketState.data) &&
        ticketState.data.length > 0 ? (
          <TicketList tickets={ticketState.data} />
        ) : null}
      </header>
    </>
  );
};

export default Dashboard;
