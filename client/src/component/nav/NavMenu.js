import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import CreateTicketModal from '../ticket-modal/CreateTicketModal';
import styles from './NavMenu.module.css';
const NavMenu = () => {
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const createTicketModalVisibilityHandler = () => {
    setShowCreateTicketModal((prevState) => !prevState);
  };
  return (
    <>
      <CreateTicketModal
        show={showCreateTicketModal}
        handleClose={createTicketModalVisibilityHandler}
      />
      <Nav className='bg-primary justify-content-end text-white align-items-center py-3'>
        <Nav.Item
          className={`mx-2 ${styles['menu-item']}`}
          onClick={createTicketModalVisibilityHandler}
        >
          Create Ticket
        </Nav.Item>
        <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
          Manage Ticket
        </Nav.Item>
        <Nav.Item className={`mx-2 ${styles['menu-item']}`}>Logout</Nav.Item>
      </Nav>
    </>
  );
};

export default NavMenu;
