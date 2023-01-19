import React, { useState } from 'react';
import UserListItem from './UserListItem';
import styles from './User.module.css';
import { Button } from 'react-bootstrap';
const UserList = ({ users, assignedUserHandler }) => {
  const [assignedUser, setAssignedUser] = useState(null);
  const userSelectHandler = (emailId) => {
    setAssignedUser(emailId);
  };

  return (
    <div className={styles['users']}>
      {users.map((user) => (
        <UserListItem
          key={user._id}
          {...user}
          userSelectHandler={userSelectHandler}
          isSelected={assignedUser === user.emailId}
        />
      ))}
      <div className='text-center'>
        <Button
          className='bg-primary text-capitalize'
          onClick={(event) => {
            event.preventDefault();
            if (assignedUser === null) {
              return;
            }
            assignedUserHandler(assignedUser);
          }}
        >
          Assign
        </Button>
      </div>
    </div>
  );
};

export default UserList;
