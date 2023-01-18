import React from 'react';
import styles from './Ticket.module.css';
import TicketListItem from './TicketListItem';
const TicketList = ({ tickets }) => {
  return (
    <ul className={styles['ticket-list']}>
      {tickets.map((ticket) => (
        <TicketListItem key={ticket._id} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketList;
