import React from "react";
import { Link } from "react-router-dom";
import "./ReservationPanel.css";

const ReservationPanel = ({reservations, loadReservations, today}) => {

  const cancelReservation = (id) => {
    const cancel = document.getElementById(id);
    cancel.classList.add("showCancelAlert");
  };

  const confirmCancelReservation = async (id) => {
    const cancel = document.getElementById(id);
    cancel.classList.remove("showCancelAlert");
    cancel.classList.add("hideCancelAlert");

    const cancelStatus = await fetch(
      `/reservations/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { status: "cancelled" } })
      }
    );

    if (cancelStatus) {
      loadReservations(today);
    }
  };

  const undoCancelReservation = (id) => {
    const cancel = document.getElementById(id);
    cancel.classList.remove("showCancelAlert");
    cancel.classList.add("hideCancelAlert");
  };

  if (reservations.length > 0) {
    return reservations.map((reservation) => {
      let myReservevation = `reservations/${reservation.id}/seat?people=${reservation.people}`;
      if (reservation.status === "booked" || reservation.status === "seated") {
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

            {reservation.status === "booked" && (
              <td>
                <Link
                  className="smallButton seat"
                  to={`${myReservevation}`}
                >
                  Seat
                </Link>
              </td>
            )}

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

            <td className="cancelAlert" id={reservation.id}>
              <p>
                Do you want to cancel this reservation? This cannot be undone.
              </p>

              <button
                onClick={() =>
                  confirmCancelReservation(
                    reservation.id,
                    history,
                  )
                }
              >
                OK
              </button>

              <button
                onClick={() =>
                  undoCancelReservation(reservation.id)
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
  console.log("reservationPanel>>>")
  return null;
};

export default ReservationPanel;
