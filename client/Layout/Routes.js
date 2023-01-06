import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Search from "../Search/Search";
//import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../Reservation/NewReservation/NewReservation";
import NewTable from "../NewTable/NewTable";
import Seat from "../Seat/Seat";
import EditReservation from "../Reservation/EditReservation/EditReservation";

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
      <Route exact={true} path="/reservations/:id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations/:id/seat">
        <Seat />
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
