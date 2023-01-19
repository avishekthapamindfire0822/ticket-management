import React from 'react';
import styles from './Ticket.module.css';
const TicketStatus = ({ status }) => {
  console.log({ styles });
  return (
    <span
      className={
        styles['ticket-status'] +
        (status === 'FIXED' ? ' bg-success' : ' bg-warning')
      }
    ></span>
  );
};

export default TicketStatus;
