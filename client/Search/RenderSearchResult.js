import React from "react";
import { useHistory } from "react-router-dom";
import {
  cancelReservation,
  undoCancelReservation,
  confirmCancelReservation,
} from "./Function";

const RenderSearchResult = ({ searchResult }) => {
  const history = useHistory();

  return searchResult.map((reservation) => {
    if (reservation.status !== "cancelled") {
      return (
        <table
          key={reservation.reservation_id}
          className="table table-sm table-dark table-hover table-responsive-sm"
        >
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
            <tr>
              <th scope="row">1</th>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.status}</td>
              <td>{reservation.mobile_number}</td>

              <td>
                <a href={`/reservations/${reservation.reservation_id}/edit`}>
                  <button className="btn btn-warning btn-sm">Edit</button>
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={() => cancelReservation(reservation.reservation_id)}
                >
                  Cancel
                </button>
              </td>
              <td className="hideCancelAlert" id={reservation.reservation_id}>
                <h5>
                  Do you want to cancel this reservation? This cannot be undone.
                </h5>
                <button
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={() =>
                    confirmCancelReservation(
                      reservation.reservation_id,
                      history
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
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  });
};

export default RenderSearchResult;


