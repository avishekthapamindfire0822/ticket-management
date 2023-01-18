import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loginUser } from '../service/auth.service';
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const emailId = emailRef.current.value;
    const password = passwordRef.current.value;
    loginUser({ emailId, password }).then((res) => {
      console.log({ res });
    });
  };
  return (
    <Container>
      <Row className='justify-content-center mt-4'>
        <Col sm={12} md={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    ref={emailRef}
                    name='emailId'
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    ref={passwordRef}
                    name='password'
                  />
                </Form.Group>
                <Stack>
                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
