import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const CreateTicketModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Ticket Description</Form.Label>
            <Form.Control
              as='textarea'
              type='text'
              placeholder='Enter description'
              style={{ height: '100px' }}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>About</Form.Label>
            <Form.Select>
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
