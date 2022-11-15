import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleMobileNumber = (event) => {
    event.preventDefault();
    setMobileNumber(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const result = await fetch(`/reservations?mobile_number=${mobileNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await result.json();
    setSearchResult(data);
    console.log("mobile front-reseult", data);
  };

  const cancelReservation = (id) => {
    const cancel = document.getElementById(id);
    cancel.classList.add("showCancelAlert");
  };

  /*
const confirmCancelReservation = async (id) => {
    const result2 = await fetch(`${reservationUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { status: "cancelled" } }),
    });

    history.go(0);
  };
  */

  const undoCancelReservation = (reservation_id) => {
    const cancel = document.getElementById(reservation_id);
    cancel.classList.remove("showCancelAlert");
  };

  return (
    <div className="container alert-primary p-4">
      <form className="container pt-5 text-center">
        <input
          className="input-lg mb-4 w-25"
          name="mobile_number"
          type="text"
          value={mobileNumber}
          placeholder="Enter a customer's phone number"
          onChange={(event) => handleMobileNumber(event)}
        />
        <button
          className=""
          onClick={(event) => handleSearch(event)}
          type="submit"
        >
          Find
        </button>
      </form>
      {searchResult.length > 0 ? (
        searchResult.map((reservation) => {
          if (reservation.status !== "cancelled") {
            return (
              <div
                className="border border-danger"
                key={reservation.reservation_id}
              >
                <h5>
                  Name: {reservation.first_name} {reservation.last_name}
                </h5>
                <h5>Mobile number: {reservation.mobile_number}</h5>
                <h5>Guess: {reservation.people}</h5>
                <h5>Reservation date: {reservation.reservation_date}</h5>
                <h5>Reservation time: {reservation.reservation_time}</h5>
                <a href={`/reservations/${reservation.reservation_id}/edit`}>
                  <button>Edit</button>
                </a>
                <a
                  onClick={() => cancelReservation(reservation.reservation_id)}
                  data-reservation-id-cancel={reservation.reservation_id}
                >
                  <button
                    data-reservation-id-cancel={reservation.reservation_id}
                  >
                    Cancel
                  </button>
                </a>
                <div
                  className="hideCancelAlert"
                  id={reservation.reservation_id}
                >
                  <h5>
                    Do you want to cancel this reservation? This cannot be
                    undone.
                  </h5>
                  <button
                    data-reservation-id-cancel={reservation.reservation_id}
                    onClick={() =>
                      confirmCancelReservation(reservation.reservation_id)
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
                </div>
              </div>
            );
          }
        })
      ) : (
        <h5>No reservations found</h5>
      )}
    </div>
  );
};

export default Search;
