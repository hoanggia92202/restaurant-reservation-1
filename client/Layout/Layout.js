import React from "react";
import Menu from "./Menu";
//import Routes from "./Routes";

import "./Layout.css";

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-12 side-bar">
          <Menu />
        </div>
        <div className="w-100">
          Routes
        </div>
      </div>
    </div>
  );
}

export default Layout;
