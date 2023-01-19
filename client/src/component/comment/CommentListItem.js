import React from 'react';
import { Card } from 'react-bootstrap';
import style from './Comment.module.css';
const CommentListItem = ({ content, author }) => {
  return (
    <Card className='p-2 mb-2 shadow-sm'>
      <p className='p-0'>
        <span className={style['name-avataar']}>{author.firstName[0]}</span>
        <span className='fw-bold mx-2'>
          {author.firstName} {author.lastName}
        </span>
      </p>
      <p className={`${style['comment-description']} p-0`}>{content}</p>
    </Card>
  );
};

export default CommentListItem;
