import React from "react";
import "./App.css";
import Weather from "./weather";

const App = () => {
  return (
    <div className="App">
      <div className="page">
        {/* <h1 className="title">Weather.App</h1> */}
        <Weather />
      </div>
      <span className="copyright">
        &copy; 2024 Angelocutiee . All right reserved.
        <br />
        The content, design, and functionality of this website are the exclusive
        property of Angelo Loreno
      </span>
    </div>
  );
};

export default App;
