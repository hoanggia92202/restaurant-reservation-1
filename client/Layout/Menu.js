import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link className="navbar-brand sidebar-brand m-0" to="/">
          <div className="sidebar-brand-text h4">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light h6" id="accordionSidebar">
          <div className="row">
            <li className="nav-item text-center col-12">
              <Link className="nav-link" to="/dashboard">
                <span className="oi oi-dashboard" />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className="nav-item text-center col-12">
              <Link className="nav-link" to="/search">
                <span className="oi oi-magnifying-glass" />
                &nbsp;Search
              </Link>
            </li>
          </div>
          <div className="row">
            <li className="nav-item text-center col-12">
              <Link className="nav-link text-center" to="/reservations/new">
                <span className="oi oi-plus" />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className="nav-item text-center col-12">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-layers" />
                &nbsp;New Table
              </Link>
            </li>
          </div>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
