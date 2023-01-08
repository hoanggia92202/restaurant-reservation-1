import React, { useState } from "react";
import { previous, next } from "../../utils/date-time";
import TablePanel from "../TablePanel";
import ReservationPanel from "../ReservationPanel/ReservationPanel";
import "./Dashboard.css";

function Dashboard({ date }) {
  const [today, setToday] = useState(date);

  const handleToday = () => {
    setToday(today);
  }

  const handleNextDay = () => {
    setToday(next(today))
  };
  
  const handlePreviousDay = () => {
    setToday(previous(today));
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
              <TablePanel />
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
