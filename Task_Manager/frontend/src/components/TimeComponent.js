import React from 'react';

function TimeComponent({ timeString }) {
  const [hours, minutes] = timeString.split(':');
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes} ${meridiem}`;

  return (
    <div className='text-primary'>{formattedTime}</div>
  );
}

export default TimeComponent;