import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import { AUTH_REDUCER_ACTION } from '../../reducer/auth-reducer';
import styles from './NavMenu.module.css';
const NavMenu = ({ hideManageTicketMenu, showCreateTicketLink }) => {
  const { state, dispatch } = useContext(AuthContext);
  const logoutHandler = (event) => {
    sessionStorage.clear('token');
    dispatch({
      type: AUTH_REDUCER_ACTION.LOGOUT,
    });
  };
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
        {/* {!showCreateTicketLink && !state.token ? (
          <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
            <Link className='text-white text-decoration-none' to='/'>
              Create Ticket
            </Link>
          </Nav.Item>
        ) : null} */}
        {state.token ? (
          <Nav.Item
            className={`mx-2 ${styles['menu-item']}`}
            onClick={logoutHandler}
          >
            Logout
          </Nav.Item>
        ) : null}
      </Nav>
    </>
  );
};

export default NavMenu;
