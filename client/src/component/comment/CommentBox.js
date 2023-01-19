import React from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentBox = React.forwardRef((commentRef, { submitHandler }) => {
  return (
    <Form onSubmit={submitHandler} className='mt-2'>
      <Form.Group className='mb-3'>
        <Form.Control
          type='text'
          placeholder='Enter comment'
          ref={commentRef}
        />
      </Form.Group>
      <div className='text-center'>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </div>
    </Form>
  );
});

export default CommentBox;
