import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../context/AuthContextProvider';
import { getITStaff } from '../../service/ticket.service';
import UserList from '../user/UserList';

const AssignTicketModal = ({ show, handleClose, assignedTicket }) => {
  const [staffMembersData, setStaffMembersData] = useState({
    loading: false,
    error: null,
    data: null,
  });
  const { state } = useContext(AuthContext);
  useEffect(() => {
    if (show) {
      setStaffMembersData((prevState) => ({
        ...prevState,
        loading: true,
      }));
      getITStaff(state.token)
        .then((res) => {
          setStaffMembersData((prevState) => ({
            ...prevState,
            loading: false,
            data: res.data.data,
          }));
        })
        .catch((err) => {
          setStaffMembersData((prevData) => ({
            ...prevData,
            error: 'Something Went Wrong!',
            loading: false,
          }));
        });
    }
  }, [state.token, show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Assign Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {staffMembersData.loading ? <p>Loading...</p> : null}
        {!staffMembersData.loading && Array.isArray(staffMembersData.data) ? (
          <UserList
            users={staffMembersData.data}
            assignedUserHandler={assignedTicket}
          />
        ) : null}
        {!staffMembersData.loading && staffMembersData.error ? (
          <p>{staffMembersData.error}</p>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};
export default AssignTicketModal;
