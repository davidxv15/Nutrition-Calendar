import React, { useState, useEffect } from 'react';
//useEffect hook gets any saved food from localStorage when 'day' gets clicked

const Day = ({ dayName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  // ADD VARIABLES FOR OTHER MACROS HERE

  useEffect(() => {
    // LOCAL STORAGE
    const savedFoodItems = localStorage.getItem(dayName);
    if (savedFoodItems) {
      setFoodItems(JSON.parse(savedFoodItems));
    }
  }, [dayName]);

  const toggleExpansion = () => {
    setIsExpanded(prevState => !prevState);
  };

  const addFoodItem = (e) => {
    e.preventDefault();
    const newFoodItem = {
      foodName: foodName,
      calories: calories
    };
    setFoodItems([...foodItems, newFoodItem]);
    setFoodName('');
    setCalories('');
    // Save updated food items to localStorage
    localStorage.setItem(dayName, JSON.stringify([...foodItems, newFoodItem]));
  };

  return (
    <div className="day" onClick={toggleExpansion}>
      <span className="day-name">{dayName}</span>
      {isExpanded && (
        <div className="day-details">
          <h3>Food</h3>
          <ul>
            {foodItems.map((item, index) => (
              <li key={index}>
                <span>{item.foodName}</span> - <span>{item.calories} calories</span>
          <button className="deleteButton" onClick={() => {
                  const updatedItems = [...foodItems];
                  updatedItems.splice(index, 1);
                  setFoodItems(updatedItems);
                  localStorage.setItem(dayName, JSON.stringify(updatedItems));
                }}>Delete</button>
              </li>
            ))}
          </ul>
          <form onSubmit={addFoodItem}>
          <input
                type="text"
                placeholder="Food Name"
                 value={foodName}
                   onChange={(e) => setFoodName(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
/>

<input
  type="number"
  placeholder="Calories"
  value={calories}
  onChange={(e) => setCalories(e.target.value)}
  onClick={(e) => e.stopPropagation()}
/>

            <button type="submit">Add Food</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Day;
