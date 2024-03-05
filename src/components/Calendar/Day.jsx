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

  // console.log("foodData:", foodData);
  // console.log("Is foodData an array?", Array.isArray(foodData));

  // foodData.forEach((item, index) => {
  //   console.log(`Food item ${index + 1}:`, item);
  //   console.log(`Name: ${item.foodName}, Calories: ${item.calories}`);
  // });

  return (
    <div
      className={`day ${isCurrentMonth ? "" : "other-month"} ${
        isToday ? "today" : ""
      }`}
      onClick={handleDayClick}
    >
      {date.format("D")}
      {isExpanded && (
        <div className="day-expanded">
          <div className="day-content">
            {/* DISPLAY: FOOD INPUT, THEN IT'S CALORIES */}

            <ol>
              {foodData.map((item) => (
                <li key={item.uuid}>
                  {/* <span>{index + 1}. </span> */}
                  {item.foodName} - {item.calories} Cal{" "}
                  <button onClick={() => handleDeleteFood(item.uuid)}>x</button>
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
