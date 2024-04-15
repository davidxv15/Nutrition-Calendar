import React from "react";
import "./App.css";

import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <h1>Nutrition <span className="cursive">Calendar1.0!</span></h1>
      <Calendar />
    </div>
  );
}

export default App;
