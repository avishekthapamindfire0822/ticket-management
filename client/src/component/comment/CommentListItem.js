import React from 'react';
import { Card } from 'react-bootstrap';
import formatDate from '../../util/util';
import style from './Comment.module.css';
const CommentListItem = ({ content, author, createdAt }) => {
  return (
    <Card className='p-2 mb-2 shadow-sm'>
      <div className='p-0 d-flex'>
        <span className={style['name-avataar']}>{author.firstName[0]}</span>
        <p className='fw-bold mx-2 flex-grow-1'>
          {author.firstName} {author.lastName}
        </p>
        <p className={style['comment-date']}>{formatDate(createdAt)}</p>
      </div>
      <p className={`${style['comment-description']} p-0`}>{content}</p>
    </Card>
  );
};

export default CommentListItem;
