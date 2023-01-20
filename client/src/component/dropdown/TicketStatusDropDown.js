import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ticketStatus = {
  UNDER_REVIEW: 'Under Review',
  FIXED: 'Fixed',
};
const TicketStatusDropDown = ({ ticketCurrentStatus, updateTicketStatus }) => {
  const [status, setStatus] = useState(ticketCurrentStatus);
  const onChangeHandler = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    updateTicketStatus(selectedStatus);
  };
  return (
    <Form.Select onChange={onChangeHandler} value={status} className='w-auto'>
      {Object.entries(ticketStatus).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Select>
  );
};

export default TicketStatusDropDown;
