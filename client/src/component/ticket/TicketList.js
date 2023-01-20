import React from 'react';
import { Row } from 'react-bootstrap';
import styles from './Ticket.module.css';
import TicketListItem from './TicketListItem';
const TicketList = ({
  tickets,
  deleteTicketCallback,
  ticketUpdateCallback,
  postNewCommentCallback,
  assignedTicketCallback,
  staffMembers,
}) => {
  return (
    <div className={`${styles['ticket-list']} container `}>
      <Row sm={1} lg={2}>
        {tickets.map((ticket) => (
          <TicketListItem
            key={ticket._id}
            staffMembers={staffMembers}
            {...ticket}
            deleteTicketCallback={deleteTicketCallback}
            ticketUpdateCallback={ticketUpdateCallback}
            postNewCommentCallback={postNewCommentCallback}
            assignedTicketCallback={assignedTicketCallback}
          />
        ))}
      </Row>
    </div>
  );
};

export default TicketList;
