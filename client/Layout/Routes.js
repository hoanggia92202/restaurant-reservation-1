import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Search from "../Search/index";
//import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../Reservation/NewReservation/NewReservation";
import NewTable from "../NewTable/index";
//import Seat from "../Seat/index";
//import Edit from "../Reservation/EditReservation/EditReservation";

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route exact={true} path="/reservations/new">
      <NewReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        Edit
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        Seat
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        NotFound
      </Route>
    </Switch>
  );
}

export default Routes;
