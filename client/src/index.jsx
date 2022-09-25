import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // create root from index.html
root.render(
  // render App
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
