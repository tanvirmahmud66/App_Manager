import React from 'react';
import { format } from 'date-fns';

function parseISOAlternative(dateTimeString) {
  const formattedString = dateTimeString.replace('Z', '');
  return new Date(formattedString);
}

function DateTimeComponent({ dateTimeString, time, date, both }) {
  const reformateDateTime = parseISOAlternative(dateTimeString);
  const parsedDate = new Date(reformateDateTime);
  const formattedDate = format(parsedDate, 'do-MMM, yyyy');
  const formattedTime = format(parsedDate, 'h:mm a');

  if(time){
    return (
      <div className='flex'>
        {/* <div className='text-success'>{formattedDate}</div> */}
        <div className=''>{formattedTime}</div>
      </div>
    );
  }

  if (date){
    return (
      <div className='flex'>
        <div className=''>{formattedDate}</div>
        {/* <div className='text-primary'>{formattedTime}</div> */}
      </div>
    );
  }

  if(both){
    return (
      <div className='flex'>
        <div className='text-success'>{formattedDate}</div>
        <div className='ms-1 text-primary'>({formattedTime})</div>
      </div>
    );
  }

  
}

export default DateTimeComponent;