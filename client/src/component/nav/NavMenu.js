import React from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './NavMenu.module.css';
const NavMenu = () => {
  return (
    <Nav className='bg-primary justify-content-end text-white align-items-center py-3'>
      <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
        Create Ticket
      </Nav.Item>
      <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
        Manage Ticket
      </Nav.Item>
      <Nav.Item className={`mx-2 ${styles['menu-item']}`}>Logout</Nav.Item>
    </Nav>
  );
};

export default NavMenu;
