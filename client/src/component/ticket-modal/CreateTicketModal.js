import React, { useContext, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createTicket } from '../../service/ticket.service';
import { AuthContext } from '../../context/AuthContextProvider';
const CreateTicketModal = ({ show, handleClose, newTicketAddedCallback }) => {
  const descriptionRef = useRef();
  const aboutTicketRef = useRef();
  const { state } = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const ticketDescription = descriptionRef.current.value;
    const aboutTicket = aboutTicketRef.current.value;
    if (ticketDescription !== '' || aboutTicket !== 'Select') {
      createTicket(state.token, {
        description: ticketDescription,
        about: aboutTicket,
      })
        .then((res) => {
          handleClose();
          newTicketAddedCallback(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3'>
            <Form.Label>Ticket Description</Form.Label>
            <Form.Control
              as='textarea'
              type='text'
              placeholder='Enter description'
              style={{ height: '100px' }}
              ref={descriptionRef}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>About</Form.Label>
            <Form.Select ref={aboutTicketRef}>
              <option>Select</option>
              <option value='MOBILE_APP'>Mobile App</option>
              <option value='WEBSITE'>Website</option>
              <option value='GENERAL'>GENERAL</option>
              <option value='SUBSCRIPTIONS'>Subscriptions</option>
              <option value='OTHER'>Other</option>
            </Form.Select>
          </Form.Group>
          <div className='text-center'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateTicketModal;
