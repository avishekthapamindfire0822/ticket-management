import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import { deleteTicket } from '../../service/ticket.service';
import TicketStatus from './TicketStatus';
const TicketListItem = ({
  _id,
  submittedBy,
  description,
  createdAt,
  status,
  deleteTicketCallback,
}) => {
  const { state } = useContext(AuthContext);
  const deleteTicketHandler = (event) => {
    event.preventDefault();
    deleteTicket(state.token, _id)
      .then((res) => {
        if (res.status === 204) {
          alert('Ticket Deleted Successfully');
          deleteTicketCallback(_id);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <Card className='mb-2'>
      <Card.Body>
        {state.role === 'IT_STAFF' ? (
          <p className='text-end' onClick={deleteTicketHandler}>
            <span
              className='text-white bg-danger px-2 py-1 rounded-pill text-capitalize'
              style={{
                cursor: 'pointer',
              }}
            >
              delete
            </span>
          </p>
        ) : null}
        {/* {state.role === "IT_STAFF" && status !== "FIXED"} */}
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
