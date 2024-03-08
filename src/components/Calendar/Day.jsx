import React from "react";
import "./Day.css";
import "./Calendar.css";

const Day = ({
  date,
  currentMonth,
  onClick,
  isExpanded,
  foodData,
  setFoodData,
  setExpandedDay,
  selectedDate,
}) => {
  const isCurrentMonth = date.month() === currentMonth.month();
  const isToday = date.isSame(new Date(), "day");
  const handleDayClick = () => {
    onClick(date);
  };

  const handleDeleteFood = (uuid) => {
    setFoodData((prevFoodData) => {
      const updatedFoodData = { ...prevFoodData };
      const dateKeys = Object.keys(updatedFoodData);
      dateKeys.forEach((dateKey) => {
        updatedFoodData[dateKey] = updatedFoodData[dateKey].filter(
          (item) => item.uuid !== uuid
        );
      });
      return updatedFoodData;
    });
  };

  const totalCalories = foodData.reduce(
    (total, item) => total + parseInt(item.calories, 10),
    0
  );

  return (
    <div
      className={`day ${
        date.month() === currentMonth.month() ? "" : "other-month"
      } ${date.isSame(new Date(), "day") ? "today" : ""}`}
      onClick={handleDayClick}
    >
      {date.format("D")}
      {isExpanded && (
        <div className="day-expanded">
          <div className="selected-date">
            {selectedDate && selectedDate.format("MM - DD - YYYY")}
          </div>
          <div className="day-content">
            {/* DISPLAY: Date, Food Input, THEN IT'S CALORIES  and  total */}
            <div className="total-calories">Total: {totalCalories}</div>

            <button
              className="close-button"
              onClick={() => setExpandedDay(null)}
            >
              Close
            </button>
            <ol>
              {foodData.map((item) => (
                <li key={item.uuid}>
                  {/* <span>{index + 1}. </span> */}
                  {item.foodName} - {item.calories} Cal{" "}
                  <button
                    className="x-button"
                    onClick={() => handleDeleteFood(item.uuid)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Day;
