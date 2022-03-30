import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";  

const rootElement = document.getElementById("root");
ReactDOM.render(
  <div className="App"> {/*не указан класс стиля, хотя импорт есть*/}
    <App />
  </div>
, rootElement);