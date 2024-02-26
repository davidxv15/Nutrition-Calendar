// Day.jsx

import React, { useState } from "react";

const Day = ({ dayName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const addFoodItem = (e) => {
    e.preventDefault();
    const newFoodItem = {
      foodName: foodName,
      calories: calories,
    };
    setFoodItems([...foodItems, newFoodItem]);
    setFoodName("");
    setCalories("");
  };

  return (
    <div className="day" onClick={toggleExpansion}>
      <span className="day-name">{dayName}</span>
      {isExpanded && (
        <div className="day-details">
          <h3>Food Items:</h3>
          <ul>
            {foodItems.map((item, index) => (
              <li key={index}>
                <span>{item.foodName}</span> -{" "}
                <span>{item.calories} calories</span>
                <button
                  onClick={() => {
                    const updatedItems = [...foodItems];
                    updatedItems.splice(index, 1);
                    setFoodItems(updatedItems);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addFoodItem}>
            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <button type="submit">Add Food</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Day;
