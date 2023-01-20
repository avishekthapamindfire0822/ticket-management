import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from './NavMenu.module.css';
const NavMenu = ({ newTicketAddedCallback }) => {
  return (
    <>
      <Nav className='bg-primary justify-content-end text-white align-items-center py-3'>
        <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
          <Link className='text-white text-decoration-none' to='/manage-ticket'>
            Manage Ticket
          </Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavMenu;
