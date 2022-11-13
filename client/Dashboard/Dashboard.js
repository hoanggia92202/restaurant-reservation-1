import React, { useEffect, useState } from "react";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import RenderTable from "./RenderTable";
import RenderReservation from "./RenderReservation";
import "./Dashboard.css";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const history = useHistory();
  const [today, setToday] = useState(date);

  useEffect(() => {
    loadReservations(today);
  },[today]);

  useEffect(() => {
    loadTables();
  },[]);

  const handleToday = () => {
    setToday(date);
  }

  const handleNextDay = async () => {
    setToday(next(today))
  };
  
  const handlePreviousDay = () => {
    setToday(previous(today));
  }

  const loadReservations = async (todayDate) => {
    const result = await fetch(`/reservations?date=${todayDate}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await result.json();
    setReservations(data);
  }

  const loadTables = async () => {
    const result = await fetch(`/tables`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await result.json();
    setTables(data);
  }

  return (
    <div className="container-fluid p-5">
      <main>
        <div className="dashboard text-center h5">Dashboard</div>
        <div className="reservation text-center h6">
          Reservations for date: {today}
        </div>
        <div className="row d-flex justify-content-center">
          <table className="table table-sm table-primary table-hover table-responsive-sm col-lg-6">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              <RenderReservation
                reservations={reservations}
                loadReservations={loadReservations}
                today={today}
              />
            </tbody>
          </table>
          <table className="table table-sm table-info table-hover table-responsive-sm col-lg-6">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Table Name</th>
                <th scope="col">Table Capacity</th>
                <th scope="col">Table Status</th>
                <th scope="col">Finish</th>
              </tr>
            </thead>
            <tbody>
              <RenderTable
                history={history}
                tables={tables}
              />
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button
            onClick={() => handlePreviousDay()}
            type="button"
            className="btn btn-success col-8 col-sm-3 col-md-2 ml-auto mr-auto mr-sm-3 mb-2"
          >
            Previous
          </button>
          <button
            onClick={() => handleToday()}
            type="button"
            className="btn btn-danger col-8 col-sm-3 col-md-2 ml-auto mr-auto mr-sm-3 mb-2"
          >
            Today
          </button>
          <button
            onClick={() => handleNextDay()}
            type="button"
            className="btn btn-warning col-8 col-sm-3 col-md-2 ml-auto mr-auto mb-2"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
