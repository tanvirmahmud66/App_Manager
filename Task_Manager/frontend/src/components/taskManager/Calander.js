import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendar = [];

    // Render weekdays
    calendar.push(
      <div key="weekdays" className="grid grid-cols-7 gap-2">
        {weekdays.map((day, index) => (
          <div key={index} className={`text-center text-gray-600 ${day==='Fri' && "text-red-600"}`}>
            {day}
          </div>
        ))}
      </div>
    );

    // Render days
    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCount > lastDay) {
          week.push(<div key={`${i}-${j}`} />);
        } else {
          const clickedDay = dayCount;
          const isCurrentDate =
            dayCount === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYear === currentDate.getFullYear();
          week.push(
            <div
              key={`${i}-${j}`}
              className={`day text-center cursor-pointer my-1 rounded-md py-1 border border-gray-200 ${isCurrentDate ? 'bg-blue-200' : ''}`}
              onClick={() =>
                alert(`Clicked on: ${clickedDay}-${currentMonth + 1}-${currentYear}`)
              }
            >
              {dayCount}
            </div>
          );
          dayCount++;
        }
      }
      calendar.push(
        <div key={i} className="grid grid-cols-7 gap-2">
          {week}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600">
          &lt;
        </button>
        <h2 className="text-lg">
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="text-gray-600">
          &gt;
        </button>
      </div>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
