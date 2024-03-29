import React from "react";
import "./Day.css";
import "./Calendar.css";
import { IoMdCloseCircle } from "react-icons/io";
import { BsTrash3 } from "react-icons/bs";



const Day = ({
  date,
  currentMonth,
  onClick,
  isExpanded,
  foodData,
  totalCaloriesData,
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
      {/* ADD CAL TOTAL IN A DIV FOR STATIC CALENDAR VIEW */}
      <div><div className="total-calories-small"><span className="underline">Total</span><br ></br> Cal: {totalCalories}</div></div>
      {isExpanded && (
        <div className="day-expanded">
          <div className="selected-date">
            {selectedDate && selectedDate.format("MMMM D, YYYY")}
          </div>
          <div className="day-content">
            <div className="total-calories">Total: {totalCalories}</div>

            <button
              className="close-window"
              onClick={() => setExpandedDay(null)}
            >
              <IoMdCloseCircle />

            </button>
            
            <ol>
              {foodData.map((item) => (
                <li key={item.uuid}>
                  {/* <span>{index + 1}. </span> */}
                  {item.foodName} - <span className="calorie-integer">{item.calories} Cal</span> {" "}
                  <button
                    className="trash-button"
                    onClick={() => handleDeleteFood(item.uuid)}
                  >
                    <BsTrash3 />

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
