import React, { useState, useEffect } from "react";
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
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const storedFoodData = localStorage.getItem("foodData");
    console.log("Retrieved foodData from local storage:", storedFoodData);

    if (storedFoodData) {
      try {
        const parsedFoodData = JSON.parse(storedFoodData);
        console.log("Parsed foodData from local storage:", parsedFoodData);
        setFoodData(parsedFoodData);
      } catch (error) {
        console.error("Error parsing foodData from local storage:", error);
      }
    } else {
      console.log("No foodData found in local storage.");
    }
  }, []);

  useEffect(() => {
    console.log("Storing foodData to local storage:", foodData);

    try {
      localStorage.setItem("foodData", JSON.stringify(foodData));
    } catch (error) {
      console.error("Error storing foodData to local storage:", error);
    }
  }, [foodData]);

  const handleAddFood = (food) => {
    if (selectedDate) {
      const dateKey = selectedDate.format("YYYY-MM-DD");
      setFoodData((prevFoodData) => {
        const updatedFoodData = {
          ...prevFoodData,
          [dateKey]: [
            ...(prevFoodData[dateKey] || []),
            { ...food, uuid: uuidv4() },
          ],
        };
        return updatedFoodData;
      });
    }
  };

  const renderCalendar = () => {
    // const weekdays = moment.weekdaysShort(); // Makes days abbreviated?
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
          onClick={handleDayClick} // will pass onClick handler to day.jsx component
          isExpanded={expandedDay && expandedDay.isSame(currentDate, "day")} // Pass 'isExpanded' prop
          foodData={foodData[currentDate.format("YYYY-MM-DD")] || []} // Pass foodData for the day i clicked
          setFoodData={setFoodData}
          setExpandedDay={setExpandedDay}
          selectedDate={selectedDate}
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
      // If the clicked day is already expanded, do nothing
      return;
    } else {
      // Otherwise, expand the clicked day. very important handler to memorize!
      setExpandedDay(day);
    }
    setSelectedDate(day);
  };

  const renderWeekdays = () => {
    const weekdays = moment.weekdaysShort(); // Abbrev days will work if above isnt'
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
        <button onClick={goToPreviousMonth} className="month-button">
          Previous Month
        </button>
        <h2 className="monthName">{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth} className="month-button">
          Next Month
        </button>
      </div>
      <div className="calendar-weekdays">{renderWeekdays()}</div>
      <div className="calendar-body">{renderCalendar()}</div>
      {/* Render FoodInput component if a day is selected, or maybe move into modal? */}
      <div className="food-input-container">
        {selectedDate && <FoodInput onAddFood={handleAddFood} />}
      </div>
    </div>
  );
};

export default Calendar;
