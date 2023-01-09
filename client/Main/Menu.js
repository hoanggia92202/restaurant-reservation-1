import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
      <Link className="nav-link text-white" to="/dashboard">
        Dashboard
      </Link>
      <Link className="nav-link text-white" to="/search">
        Search
      </Link>
      <Link className="nav-link text-white" to="/tables/new">
        New Table
      </Link>
      <Link className="nav-link text-white" to="/reservations/new">
        New Reservation
      </Link>
    </nav>
  );
}

export default Menu;


