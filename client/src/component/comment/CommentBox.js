import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const CommentBox = React.forwardRef(
  ({ submitHandler, postCommentIsInProgress }, commentRef) => {
    return (
      <Form onSubmit={submitHandler} className='mt-2'>
        <Form.Group className='mb-3 flex-grow-1'>
          <Form.Control
            type='text'
            placeholder='Enter comment'
            as='textarea'
            ref={commentRef}
            rows={3}
            disabled={postCommentIsInProgress}
          />
        </Form.Group>
        <div className='text-end'>
          <Button
            variant='primary'
            type='submit'
            style={
              postCommentIsInProgress
                ? {
                    minWidth: '5rem',
                  }
                : {}
            }
          >
            {postCommentIsInProgress ? <Spinner /> : 'Submit'}
          </Button>
        </div>
      </Form>
    );
  }
);

export default CommentBox;
