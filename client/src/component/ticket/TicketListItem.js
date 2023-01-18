import React from 'react';
import { Card } from 'react-bootstrap';
const TicketListItem = ({
  _id,
  submittedBy,
  description,
  createdAt,
  status,
}) => {
  return (
    <Card className='mb-2'>
      <Card.Body>
        <p className='mb-4'>{description}</p>
        <p>Submitted on : {new Date(createdAt).toDateString()}</p>
        <p className='fw-bold'>Status : {status.toUpperCase()}</p>
      </Card.Body>
    </Card>
  );
};

export default TicketListItem;
