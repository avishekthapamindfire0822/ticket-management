import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import TicketStatus from './TicketStatus';
const TicketListItem = ({
  _id,
  submittedBy,
  description,
  createdAt,
  status,
}) => {
  const { state } = useContext(AuthContext);
  return (
    <Card className='mb-2'>
      <Card.Body>
        <p className='mb-4'>{description}</p>
        <p>Submitted on : {new Date(createdAt).toDateString()}</p>
        <p className='fw-bold'>
          Status : {status.toUpperCase()}
          <TicketStatus status={status} />
        </p>
        {state.role === 'IT_STAFF' ? (
          <p>
            Submitted by : {`${submittedBy.firstName} ${submittedBy.lastName}`}
          </p>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default TicketListItem;
