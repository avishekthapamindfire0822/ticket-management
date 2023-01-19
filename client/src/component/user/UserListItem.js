import React from 'react';
import { Card } from 'react-bootstrap';

const UserListItem = ({
  firstName,
  lastName,
  isSelected,
  emailId,
  userSelectHandler,
}) => {
  return (
    <Card
      className={`mb-2 ${isSelected ? ' border-primary' : ''}`}
      onClick={(event) => {
        userSelectHandler(emailId);
      }}
    >
      <Card.Body>{`${firstName} ${lastName}`}</Card.Body>
    </Card>
  );
};

export default UserListItem;
