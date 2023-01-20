import React, { useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import NavMenu from '../component/nav/NavMenu';
import { createTicket } from '../service/ticket.service';

const Home = () => {
  const descriptionRef = useRef();
  const aboutTicketRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const resetInputs = () => {
    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    emailRef.current.value = '';
    descriptionRef.current.value = '';
    aboutTicketRef.current.value = '';
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const emailId = emailRef.current.value;
    const ticketDescription = descriptionRef.current.value;
    const aboutTicket = aboutTicketRef.current.value;

    createTicket({
      firstName,
      lastName,
      emailId,
      description: ticketDescription,
      about: aboutTicket,
    })
      .then(() => {
        resetInputs();
        alert('Ticket Submitted Successfully.');
      })
      .catch((err) => {
        alert('Something went wrong');
      });
  };
  return (
    <>
      <header>
        <NavMenu />
      </header>
      <main>
        <Card
          style={{
            maxWidth: 'min(90%,30rem)',
            margin: '1rem auto',
          }}
        >
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3'>
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  placeholder='Enter Firstname'
                  ref={firstNameRef}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter lastName'
                  ref={lastNameRef}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  required
                  ref={emailRef}
                />
              </Form.Group>
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
          </Card.Body>
        </Card>
      </main>
    </>
  );
};

export default Home;
