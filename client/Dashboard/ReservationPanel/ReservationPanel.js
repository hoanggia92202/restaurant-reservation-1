import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ReservationPanel.css";
import CancelAlert from "./CancelAlert";

const ReservationPanel = ({today}) => {
  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    loadReservations(today, signal);
    return () => abortController.abort();
  },[today]);

  const cancelReservation = (id) => {
    const cancel = document.getElementById(id);
    cancel.classList.add("showCancelAlert");
  };

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
      console.log("Error: ", err);
    }
  };

  /* list all available reservations in database */
  if (reservations.length > 0) {
    return reservations.map((reservation) => {
      
      /* set link to seat assignment */
      const myReservevation = `reservations/${reservation.id}/seat?people=${reservation.people}`;
      
      return (
        <tr key={reservation.id}>
          <th scope="row">{reservation.id}</th>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td data-reservation-id-status={reservation.id}>
            {reservation.status}
          </td>
          <td>{reservation.mobile_number}</td>
          <td>
            <Link
              className="smallButton seat"
              to={`${myReservevation}`}
            >
              Seat
            </Link>
          </td>
          <td>
            <Link
              className="smallButton edit"
              to={`/reservations/${reservation.id}/edit`}
            >
              Edit
            </Link>
          </td>
          <td>
            <Link
              className="smallButton cancel"
              onClick={() => cancelReservation(reservation.id)}
            >
              cancel
            </Link>
          </td>
          <CancelAlert id={reservation.id} />
        </tr>
      );
    });
  }
};

export default ReservationPanel;
