import React, { useEffect, useState } from "react";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";
//import { tablesUrl, reservationUrl } from "./api";
import RenderTable from "./RenderTable";
import RenderReservation from "./RenderReservation";
import "./Dashboard.css";
import {
  handleToday,
  handlePreviousDay,
  handleNextDay,
  seatFinish,
  confirmSeatFinish,
  cancelSeatFinish,
  confirmCancelReservation,
  undoCancelReservation,
  cancelReservation,
} from "./Functions";

function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const history = useHistory();
  const [today, setToday] = useState("");
  const [previousDay, setPreviousDay] = useState("");
  const [nextDay, setNextDay] = useState("");
  const [dashboardDate, setDashboardDate] = useState("");

  //useEffect(loadDashboard, [today]);
  //useEffect(loadTables, []);

  async function loadDashboard() {
    
    history.push(`/dashboard?date=${date}`);
    try {
      console.log("process.env 1>>>", process.env, API_BASE_URL)
      const result = await fetch(`/reservations?date=${date}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const { data } = await result.json();
      if (data) {
        setReservations(data);
        setToday(date);
        setPreviousDay(date);
        setNextDay(date);
        setDashboardDate(date);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loadTables() {
    
    fetch(`https://polo99.herokuapp.com/tables`)
      .then((data) => {
        console.log("process.env 2>>>", process.env)
        data.json().then((result) => {
          console.log("process.env 3>>>", process.env)
          setTables(result.data)
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container-fluid p-5">
      <main>
        <div className="dashboard text-center h5">Dashboard</div>
        <div className="reservation text-center h6">
          Reservations for date: {dashboardDate}
        </div>
        <div className="row d-flex justify-content-center">
          <table className="table table-sm table-primary table-hover table-responsive-sm col-lg-5 m-3">
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
                loadDashboard={loadDashboard}
                reservations={reservations}
                cancelReservation={cancelReservation}
                confirmCancelReservation={confirmCancelReservation}
                undoCancelReservation={undoCancelReservation}
                history={history}
              />
            </tbody>
          </table>

          <table className="table table-sm table-info table-hover table-responsive-sm col-lg-5 m-3">
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
                seatFinish={seatFinish}
                confirmSeatFinish={confirmSeatFinish}
                cancelSeatFinish={cancelSeatFinish}
              />
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            onClick={() =>
              handlePreviousDay(
                previous,
                previousDay,
                setReservations,
                setPreviousDay,
                setNextDay,
                history,
                setDashboardDate
              )
            }
            type="button"
            className="btn btn-success col-8 col-sm-3 col-md-2 ml-auto mr-auto mr-sm-3 mb-2"
          >
            Previous
          </button>

          <button
            onClick={() => handleToday(loadDashboard)}
            type="button"
            className="btn btn-danger col-8 col-sm-3 col-md-2 ml-auto mr-auto mr-sm-3 mb-2"
          >
            Today
          </button>

          <button
            onClick={() =>
              handleNextDay(
                next,
                nextDay,
                setReservations,
                setNextDay,
                setPreviousDay,
                history,
                setDashboardDate
              )
            }
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
