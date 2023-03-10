import React, { useContext, useRef, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavMenu from '../component/nav/NavMenu';
import { AuthContext } from '../context/AuthContextProvider';
import { createTicket } from '../service/ticket.service';

const Home = () => {
  const { state } = useContext(AuthContext);
  const [createTicketIsInProgress, setCreateTicketIsInProgress] =
    useState(false);
  const descriptionRef = useRef();
  const productRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const titleRef = useRef();
  const resetInputs = () => {
    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    emailRef.current.value = '';
    descriptionRef.current.value = '';
    productRef.current.value = '';
    titleRef.current.value = '';
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const emailId = emailRef.current.value;
    const ticketDescription = descriptionRef.current.value;
    const productType = productRef.current.value;
    const title = titleRef.current.value;
    if (productType === '') {
      return toast.warn('Please select product type for ticket.');
    }
    setCreateTicketIsInProgress(true);
    createTicket({
      firstName,
      lastName,
      emailId,
      title,
      description: ticketDescription,
      about: productType,
    })
      .then(() => {
        resetInputs();
        toast.success('Ticket Submitted Successfully.');
      })
      .catch((err) => {
        alert('Something went wrong');
      })
      .finally(() => {
        setCreateTicketIsInProgress(false);
      });
  };
  if (state.token) {
    return <Navigate to='/manage-ticket' replace />;
  }
  return (
    <>
      <header>
        <NavMenu />
      </header>
      <main>
        <Card
          style={{
            maxWidth: 'min(90%,30rem)',
            margin: '2rem auto',
          }}
        >
          <Card.Header>
            <Card.Title className='text-center'>Create Ticket</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3'>
                <Form.Label>Firstname</Form.Label>
                <span className='text-danger fw-bold mx-1'>*</span>
                <Form.Control
                  placeholder='Firstname'
                  ref={firstNameRef}
                  required
                  disabled={createTicketIsInProgress}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Lastname</Form.Label>
                <span className='text-danger fw-bold mx-1'>*</span>
                <Form.Control
                  type='text'
                  placeholder='Lastname'
                  ref={lastNameRef}
                  required
                  disabled={createTicketIsInProgress}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <span className='text-danger fw-bold mx-1'>*</span>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  required
                  ref={emailRef}
                  disabled={createTicketIsInProgress}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <span className='text-danger fw-bold mx-1'>*</span>
                <Form.Control
                  type='text'
                  placeholder='Title'
                  required
                  ref={titleRef}
                  disabled={createTicketIsInProgress}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <span className='text-danger fw-bold mx-1'>*</span>
                <Form.Control
                  as='textarea'
                  type='text'
                  placeholder='Description'
                  style={{ height: '100px' }}
                  ref={descriptionRef}
                  disabled={createTicketIsInProgress}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Product</Form.Label>
                <span className='text-danger fw-bold mx-1'>*</span>
                <Form.Select
                  ref={productRef}
                  disabled={createTicketIsInProgress}
                >
                  <option value=''>Select</option>
                  <option value='MOBILE_APP'>Mobile App</option>
                  <option value='WEBSITE'>Website</option>
                  <option value='GENERAL'>General</option>
                  <option value='SUBSCRIPTIONS'>Subscriptions</option>
                  <option value='OTHER'>Other</option>
                </Form.Select>
              </Form.Group>
              <div className='text-center'>
                <Button
                  variant='primary w-100'
                  type='submit'
                  disabled={createTicketIsInProgress}
                >
                  {createTicketIsInProgress ? <Spinner /> : 'Submit'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </main>
    </>
  );
};

export default Home;
