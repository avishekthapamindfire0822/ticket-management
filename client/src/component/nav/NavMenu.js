import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import styles from './NavMenu.module.css';
const NavMenu = ({ hideManageTicketMenu }) => {
  const { state } = useContext(AuthContext);
  return (
    <>
      <Nav className='bg-primary justify-content-end text-white align-items-center py-3 px-4 justify-content-between'>
        <h1 className='fs-4'>Ticket Management System</h1>
        {!hideManageTicketMenu && !state.token ? (
          <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
            <Link
              className='text-white text-decoration-none'
              to='/manage-ticket'
            >
              Manage Ticket
            </Link>
          </Nav.Item>
        ) : null}
        {state.token ? (
          <Nav.Item className={`mx-2 ${styles['menu-item']}`}>Logout</Nav.Item>
        ) : null}
      </Nav>
    </>
  );
};

export default NavMenu;
