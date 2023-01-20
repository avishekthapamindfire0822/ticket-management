import React, { useContext, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContextProvider';
import {
  assignTicketToStaff,
  deleteTicket,
  markTicketAsComplete,
  postCommentOnTicket,
} from '../../service/ticket.service';
import formatDate from '../../util/util';
import CommentBox from '../comment/CommentBox';
import CommentList from '../comment/CommentList';
import StaffDropdown from '../dropdown/StaffDropdown';
import TicketStatusDropDown from '../dropdown/TicketStatusDropDown';
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
  staffMembers,
}) => {
  const { state } = useContext(AuthContext);
  const [showComment, setShowComments] = useState(false);
  const commentRef = useRef();
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

  const updateTicketStatus = (ticketStatus) => {
    markTicketAsComplete(state.token, _id, ticketStatus)
      .then((res) => {
        if (res.status === 204) {
          ticketUpdateCallback(_id, ticketStatus);
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
        postNewCommentCallback(_id, res.data.data);
      })
      .catch(console.log);
  };

  const assignTicket = (emailId) => {
    assignTicketToStaff(state.token, _id, emailId)
      .then((res) => {
        if (res.status === 201) {
          const { firstName, lastName, _id } = res.data.data;
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
          <p>Submitted on : {formatDate(createdAt)}</p>
          <div className='d-flex align-items-center gap-1 mb-2'>
            <p className='m-0'>Status :</p>
            <TicketStatusDropDown
              ticketCurrentStatus={status}
              updateTicketStatus={updateTicketStatus}
            />
          </div>
          {state.role === 'IT_STAFF' ? (
            <p>
              Submitted by :{' '}
              {`${submittedBy.firstName} ${submittedBy.lastName}`}
            </p>
          ) : null}
          {/* {state.role === 'IT_STAFF' && status !== 'FIXED' ? (
            <div className='text-end'>
              <input type='checkbox' onChange={onChangeHandler} />
              <span className='mx-2'>Mark As Fixed</span>
            </div>
          ) : null} */}
          <div className='d-flex align-items-center gap-2 mb-3'>
            <p className='m-0'>Assign To : </p>
            <StaffDropdown
              staffMembers={staffMembers}
              currentAssignedStaffEmailId={assignedTo?.emailId}
              assignTicket={assignTicket}
            />
          </div>
          <p
            onClick={() => {
              setShowComments((prevState) => !prevState);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            {!showComment ? 'Show' : 'Hide'} comments
          </p>
          {showComment && state.role === 'IT_STAFF' ? (
            <CommentBox ref={commentRef} submitHandler={submitHandler} />
          ) : null}
          {showComment && comments?.length > 0 ? (
            <CommentList comments={comments} />
          ) : null}
          {showComment && comments?.length === 0 ? <p>No Comments</p> : null}
        </Card.Body>
      </Card>
    </>
  );
};

export default TicketListItem;
