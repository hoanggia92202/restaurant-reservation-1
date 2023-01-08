import React, { useEffect, useState } from "react";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import TablePanel from "./TablePanel";
import ReservationPanel from "./ReservationPanel";
import "./Dashboard.css";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [today, setToday] = useState(date);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    loadReservations(today, signal);
    return () => abortController.abort();
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

  const loadReservations = async (todayDate, signal) => {
    try{
      const response = await fetch(`/reservations?date=${todayDate}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: signal
      });

      if(response.status === 200){
        const { data } = await response.json();
        setReservations(data);  
      }else {
        console.log("Error loading reservations: ", response)
      }
    }catch(err) {
      console.log("Error....", err);
    }
  }

  const loadTables = async () => {
    try{
      const response = await fetch(`/tables`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if(response.status === 200){
        const { data } = await response.json();
        setTables(data);
      }else {
        console.log("Error loading tables: ", response)
      }
    }catch(err){
      console.log("Error....", err);
    }
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
              <ReservationPanel
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
              <TablePanel
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
            className="btn btn-success col-7 col-sm-3 col-md-2 ml-auto mr-auto mr-sm-3 mb-2"
          >
            Previous
          </button>
          <button
            onClick={() => handleToday()}
            type="button"
            className="btn btn-danger col-7 col-sm-3 col-md-2 ml-auto mr-auto mr-sm-3 mb-2"
          >
            Today
          </button>
          <button
            onClick={() => handleNextDay()}
            type="button"
            className="btn btn-warning col-7 col-sm-3 col-md-2 ml-auto mr-auto mb-2"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
