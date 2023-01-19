import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import CreateTicketModal from '../ticket-modal/CreateTicketModal';
import styles from './NavMenu.module.css';
const NavMenu = ({ newTicketAddedCallback }) => {
  const { state } = useContext(AuthContext);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const createTicketModalVisibilityHandler = () => {
    setShowCreateTicketModal((prevState) => !prevState);
  };
  return (
    <>
      <CreateTicketModal
        show={showCreateTicketModal}
        handleClose={createTicketModalVisibilityHandler}
        newTicketAddedCallback={newTicketAddedCallback}
      />
      <Nav className='bg-primary justify-content-end text-white align-items-center py-3'>
        <Nav.Item
          className={`mx-2 ${styles['menu-item']}`}
          onClick={createTicketModalVisibilityHandler}
        >
          Create Ticket
        </Nav.Item>
        {state.role === 'IT_STAFF' ? (
          <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
            <Link
              className='text-white text-decoration-none'
              to='/manage-ticket'
            >
              Manage Ticket
            </Link>
          </Nav.Item>
        ) : null}
        <Nav.Item className={`mx-2 ${styles['menu-item']}`}>Logout</Nav.Item>
      </Nav>
    </>
  );
};

export default NavMenu;
