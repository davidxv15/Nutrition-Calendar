import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FoodInput = ({ onAddFood }) => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4(); // This generates my unique Id
    onAddFood({ id, foodName, calories });
    setFoodName("");
    setCalories("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default FoodInput;
