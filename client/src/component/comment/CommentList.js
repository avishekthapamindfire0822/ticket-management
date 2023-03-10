import React from 'react';
import styles from './Comment.module.css';
import CommentListItem from './CommentListItem';
const CommentList = ({ comments }) => {
  return (
    <div className={`${styles['comments']} pb-3`}>
      {comments.map((comment) => (
        <CommentListItem key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
