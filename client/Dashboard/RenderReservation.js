import React from "react";
import { Link } from "react-router-dom";

const RenderReservation = ({
  reservations,
  history,
  
}) => {
  const cancelReservation = (reservation_id) => {
    const cancel = document.getElementById(reservation_id);
    cancel.classList.add("showCancelAlert");
  };

  if (reservations.length > 0) {
    return reservations.map((reservation) => {
      let myReservevation = `reservations/${reservation.reservation_id}/seat?people=${reservation.people}`;
      if (reservation.status === "booked" || reservation.status === "seated") {
        return (
          <tr key={reservation.reservation_id}>
            <th scope="row">{reservation.reservation_id}</th>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_date}</td>
            <td data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </td>
            <td>{reservation.mobile_number}</td>

            {reservation.status === "booked" && (
              <td>
                <Link
                  className="btn btn-primary btn-sm"
                  to={`${myReservevation}`}
                >
                  Seat
                </Link>
              </td>
            )}

            <td>
              <Link
                className="btn btn-warning btn-sm"
                to={`/reservations/${reservation.reservation_id}/edit`}
              >
                Edit
              </Link>
            </td>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => cancelReservation(reservation.reservation_id)}
                data-reservation-id-cancel={reservation.reservation_id}
              >
                cancel
              </button>
            </td>

            <td className="cancelAlert" id={reservation.reservation_id}>
              <p>
                Do you want to cancel this reservation? This cannot be undone.
              </p>

              <button
                onClick={() =>
                  confirmCancelReservation(
                    reservation.reservation_id,
                    history,
                    
                  )
                }
              >
                OK
              </button>

              <button
                onClick={() =>
                  undoCancelReservation(reservation.reservation_id)
                }
              >
                cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  }
  return null;
};

export default RenderReservation;
