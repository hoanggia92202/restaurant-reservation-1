import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Main.css";

function Main() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-12 side-bar">
          <Menu />
        </div>
        <div className="w-100">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Main;
