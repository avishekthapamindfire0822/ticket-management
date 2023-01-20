import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
const StaffDropdown = ({
  staffMembers,
  currentAssignedStaffEmailId,
  assignTicket,
}) => {
  const [value, setValue] = useState(currentAssignedStaffEmailId ?? '');
  const onChangeHandler = (event) => {
    const selectedStaffEmailId = event.target.value;
    setValue(selectedStaffEmailId);
    assignTicket(selectedStaffEmailId);
  };
  return (
    <Form.Select className='w-auto' value={value} onChange={onChangeHandler}>
      {!currentAssignedStaffEmailId ? (
        <option value=''>Unassigned</option>
      ) : null}
      {staffMembers.map((staffMember) => (
        <option
          key={staffMember._id}
          value={staffMember.emailId}
        >{`${staffMember.firstName} ${staffMember.lastName}`}</option>
      ))}
    </Form.Select>
  );
};

export default StaffDropdown;
