import React from 'react';
import styles from './Ticket.module.css';
import TicketListItem from './TicketListItem';
const TicketList = ({
  tickets,
  deleteTicketCallback,
  ticketUpdateCallback,
}) => {
  return (
    <ul className={styles['ticket-list']}>
      {tickets.map((ticket) => (
        <TicketListItem
          key={ticket._id}
          {...ticket}
          deleteTicketCallback={deleteTicketCallback}
          ticketUpdateCallback={ticketUpdateCallback}
        />
      ))}
    </ul>
  );
};

export default TicketList;
