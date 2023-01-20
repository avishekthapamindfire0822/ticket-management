import React from 'react';
import { Button, Form } from 'react-bootstrap';

const CommentBox = React.forwardRef(({ submitHandler }, commentRef) => {
  return (
    <Form onSubmit={submitHandler} className='mt-2'>
      <Form.Group className='mb-3 flex-grow-1'>
        <Form.Control
          type='text'
          placeholder='Enter comment'
          as='textarea'
          ref={commentRef}
          rows={3}
        />
      </Form.Group>
      <div className='text-end'>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </div>
    </Form>
  );
});

export default CommentBox;
