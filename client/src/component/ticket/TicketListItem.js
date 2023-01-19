import React, { useContext, useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import {
  assignTicketToStaff,
  deleteTicket,
  markTicketAsComplete,
  postCommentOnTicket,
} from '../../service/ticket.service';
import AssignTicketModal from '../ticket-modal/AssignTicketModal';
import TicketStatus from './TicketStatus';
const TicketListItem = ({
  _id,
  submittedBy,
  description,
  createdAt,
  status,
  assignedTo,
  deleteTicketCallback,
  ticketUpdateCallback,
  postNewCommentCallback,
  assignedTicketCallback,
  comments,
}) => {
  const { state } = useContext(AuthContext);
  const [showComment, setShowComments] = useState(false);
  const [showTickedAssignModal, setTicketAssignModal] = useState(false);
  const commentRef = useRef();

  const ticketAssignModalVisibilityHandler = (event) => {
    setTicketAssignModal((prevState) => !prevState);
  };
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

  const onChangeHandler = (event) => {
    markTicketAsComplete(state.token, _id)
      .then((res) => {
        if (res.status === 204) {
          alert('Ticket updated successfully.');
          ticketUpdateCallback(_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const comment = commentRef.current.value;
    if (!comment) {
      return;
    }
    postCommentOnTicket(state.token, _id, comment)
      .then((res) => {
        commentRef.current.value = '';
        postNewCommentCallback(_id, res.data.data.comments);
      })
      .catch(console.log);
  };

  const assignedTicket = (emailId) => {
    assignTicketToStaff(state.token, _id, emailId)
      .then((res) => {
        if (res.status === 201) {
          const { firstName, lastName, _id } = res.data.data;
          ticketAssignModalVisibilityHandler();
          assignedTicketCallback({
            firstName,
            lastName,
            _id,
            ticketId: _id,
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <>
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
          <p className='mb-4'>{description}</p>
          <p>Submitted on : {new Date(createdAt).toDateString()}</p>
          <p className='fw-bold'>
            Status : {status.toUpperCase()}
            <TicketStatus status={status} />
          </p>
          {state.role === 'IT_STAFF' ? (
            <p>
              Submitted by :{' '}
              {`${submittedBy.firstName} ${submittedBy.lastName}`}
            </p>
          ) : null}
          {state.role === 'IT_STAFF' && status !== 'FIXED' ? (
            <div className='text-end'>
              <input type='checkbox' onChange={onChangeHandler} />
              <span className='mx-2'>Mark As Fixed</span>
            </div>
          ) : null}
          {assignedTo ? (
            <p>
              Assigned To : {assignedTo.firstName} {assignedTo.lastName}
            </p>
          ) : null}
          <p
            onClick={() => {
              setShowComments((prevState) => !prevState);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            Show comments
          </p>
          {showComment && comments?.length > 0 ? (
            <div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {comments.map((comment) => (
                  <li key={comment._id} className='mb-2'>
                    <Card className='p-2'>{comment.content}</Card>
                  </li>
                ))}
              </ul>
              {state.role === 'IT_STAFF' ? (
                <Form onSubmit={submitHandler} className='mt-2'>
                  <Form.Group className='mb-3'>
                    <Form.Control
                      as='textarea'
                      type='text'
                      placeholder='Enter comment'
                      style={{ height: '100px' }}
                      ref={commentRef}
                    />
                  </Form.Group>
                  <div className='text-center'>
                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              ) : null}
            </div>
          ) : null}
          {showComment && comments?.length === 0 ? <p>No Comments</p> : null}
          {state.role === 'IT_STAFF' && !assignedTo ? (
            <Button
              className='bg-primary text-capitalize'
              onClick={ticketAssignModalVisibilityHandler}
            >
              assign to
            </Button>
          ) : null}
        </Card.Body>
      </Card>
      <AssignTicketModal
        show={showTickedAssignModal}
        handleClose={ticketAssignModalVisibilityHandler}
        assignedTicket={assignedTicket}
      />
    </>
  );
};

export default TicketListItem;
