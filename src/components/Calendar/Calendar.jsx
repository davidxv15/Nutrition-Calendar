import React, { useState } from "react";
import moment from "moment";
import Day from "./Day";
import FoodInput from "../FoodInput/FoodInput";
import { v4 as uuidv4 } from "uuid";

import "./Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [foodData, setFoodData] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);

  const handleAddFood = (food) => {
    if (selectedDate) {
      const dateKey = selectedDate.format("YYYY-MM-DD");
      setFoodData((prevFoodData) => ({
        ...prevFoodData,
        [dateKey]: [
          ...(prevFoodData[dateKey] || []),
          { ...food, uuid: uuidv4() },
        ],
      }));
    }
  };

  const renderCalendar = () => {
    // const weekdays = moment.weekdaysShort(); // Makes days abbreviated
    const monthStart = currentMonth.clone().startOf("month");
    const monthEnd = currentMonth.clone().endOf("month");
    const startDate = monthStart.clone().startOf("week");
    const endDate = monthEnd.clone().endOf("week");

    const calendarDays = [];

    let currentDate = startDate.clone();
    while (currentDate.isBefore(endDate, "day")) {
      calendarDays.push(
        <Day
          key={currentDate.format("YYYY-MM-DD")}
          date={currentDate.clone()}
          currentMonth={currentMonth}
          onClick={handleDayClick} // Pass onClick handler to Day component
          isExpanded={expandedDay && expandedDay.isSame(currentDate, "day")} // Pass isExpanded prop
          foodData={foodData[currentDate.format("YYYY-MM-DD")] || []} // Pass foodData for the day
          setFoodData={setFoodData}
        />
      );
      currentDate.add(1, "day");
    }

    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const handleDayClick = (day) => {
    if (expandedDay && expandedDay.isSame(day, "day")) {
      // If the clicked day is already expanded, collapse it
      setExpandedDay(null);
    } else {
      // Otherwise, expand the clicked day
      setExpandedDay(day);
    }
    setSelectedDate(day);
  };

  const renderWeekdays = () => {
    const weekdays = moment.weekdaysShort(); // Get abbreviated names of days of the week
    return weekdays.map((day) => (
      <div className="weekday" key={day}>
        {day}
      </div>
    ));
  };

  console.log("foodData:", foodData);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>Previous</button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div className="calendar-weekdays">{renderWeekdays()}</div>
      <div className="calendar-body">{renderCalendar()}</div>
      {/* Render FoodInput component if a day is selected */}
      <div className="food-input-container">
        {selectedDate && <FoodInput onAddFood={handleAddFood} />}
      </div>
    </div>
  );
};

export default Calendar;
