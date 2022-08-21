import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";

/*
ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);
*/

ReactDOM.createRoot(document.getElementById("root")).render(<App />);