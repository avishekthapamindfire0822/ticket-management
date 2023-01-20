import React, { useContext, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../service/auth.service';
import { AuthContext } from '../context/AuthContextProvider';
import { AUTH_REDUCER_ACTION } from '../reducer/auth-reducer';
import NavMenu from '../component/nav/NavMenu';
import { toast } from 'react-toastify';
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { state, dispatch } = useContext(AuthContext);
  if (state.token) {
    return <Navigate to='/manage-ticket' replace />;
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const emailId = emailRef.current.value;
    const password = passwordRef.current.value;
    loginUser({ emailId, password })
      .then((res) => {
        sessionStorage.setItem('token', res.data.data.token);
        sessionStorage.setItem('fullName', res.data.data.fullName);
        dispatch({
          type: AUTH_REDUCER_ACTION.LOGIN,
          payload: { ...res.data.data },
        });
        toast.success('Login Successfully.');
      })
      .catch((err) => {
        toast.error('Invalid Credentials');
      });
  };
  return (
    <>
      <NavMenu hideManageTicketMenu={true} />
      <Container
        style={{
          marginTop: '6rem',
        }}
      >
        <Row className='justify-content-center mt-4'>
          <Col sm={12} md={8} lg={4}>
            <Card>
              <Card.Header>
                <Card.Title className='text-center'>Admin Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmitHandler}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <span className='text-danger fw-bold mx-1'>*</span>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      ref={emailRef}
                      name='emailId'
                      required
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <span className='text-danger fw-bold mx-1'>*</span>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      ref={passwordRef}
                      required
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
    </>
  );
};

export default Login;
