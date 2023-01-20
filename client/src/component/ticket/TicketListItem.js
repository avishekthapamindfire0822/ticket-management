import React, { useContext, useRef, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
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
import styles from './Ticket.module.css';
const TicketListItem = ({
  _id,
  title,
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
  const [postCommentIsInProgress, setPostCommentIsInProgress] = useState(false);
  const commentRef = useRef();
  const deleteTicketHandler = (event) => {
    event.preventDefault();
    deleteTicket(state.token, _id)
      .then((res) => {
        if (res.status === 204) {
          deleteTicketCallback(_id);
          toast.success('Ticket deleted successfully.');
        }
      })
      .catch((err) => {
        toast.error('Unable to delete ticket. Please try after sometime!');
      });
  };

  const updateTicketStatus = (ticketStatus) => {
    markTicketAsComplete(state.token, _id, ticketStatus)
      .then((res) => {
        if (res.status === 204) {
          toast.success('Ticket status updated successfully.');
          ticketUpdateCallback(_id, ticketStatus);
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const comment = commentRef.current.value;
    if (!comment) {
      return;
    }
    setPostCommentIsInProgress(true);
    postCommentOnTicket(state.token, _id, comment)
      .then((res) => {
        commentRef.current.value = '';
        postNewCommentCallback(_id, res.data.data);
      })
      .catch((err) => {
        console.log({ err });
        toast.error('Unable to post comment.Try after some time!');
      })
      .finally(() => {
        setPostCommentIsInProgress(false);
      });
  };

  const assignTicket = (emailId) => {
    assignTicketToStaff(state.token, _id, emailId)
      .then((res) => {
        if (res.status === 201) {
          if (emailId === '') {
            assignedTicketCallback({});
            toast.success(`Ticket is successfully unassigned.`);
          } else {
            const { firstName, lastName, _id } = res.data.data;
            assignedTicketCallback({
              firstName,
              lastName,
              _id,
              ticketId: _id,
            });
            toast.success(
              `Ticket successfully assigned to ${firstName} ${lastName}`
            );
          }
        }
      })
      .catch((err) => {
        console.log({ err });
        toast.error('Ticket Assignment failed.Please try after some time!');
      });
  };
  return (
    <>
      <Col>
        <Card
          className='mb-2 overflow-hidden'
          style={{
            height: '45rem',
          }}
        >
          <Card.Body>
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
            <p className={`${styles['trim-text']} fw-bold mb-4`}>{title}</p>
            <p className={`${styles['trim-text']} mb-3`}>{description}</p>
            <p>Submitted on : {formatDate(createdAt)}</p>
            <p className='mb-4'>
              Submitted by :{' '}
              {`${submittedBy.firstName} ${submittedBy.lastName}`}
            </p>
            <div className='d-flex justify-content-between align-items-center gap-2'>
              <div className='d-flex align-items-center gap-1 mb-2'>
                <p className='m-0'>Status :</p>
                <TicketStatusDropDown
                  ticketCurrentStatus={status}
                  updateTicketStatus={updateTicketStatus}
                />
              </div>
              <div className='d-flex align-items-center gap-2 mb-2'>
                <p className='m-0'>Assign To : </p>
                <StaffDropdown
                  staffMembers={staffMembers}
                  currentAssignedStaffEmailId={assignedTo?.emailId}
                  assignTicket={assignTicket}
                />
              </div>
            </div>
            <CommentBox
              ref={commentRef}
              submitHandler={submitHandler}
              postCommentIsInProgress={postCommentIsInProgress}
            />
            {comments?.length > 0 ? <CommentList comments={comments} /> : null}
            {comments?.length === 0 ? <p>No Comments</p> : null}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TicketListItem;
