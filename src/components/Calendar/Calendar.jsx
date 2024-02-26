// Calendar.jsx

import React from 'react';
import './Calendar.css'; // Import the CSS file
import Day from './Day'; // Import the Day component

const Calendar = () => {
  // Dummy data for demonstration
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <div className="calendar-grid">
        {days.map(day => (
          <Day key={day} dayName={day} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
