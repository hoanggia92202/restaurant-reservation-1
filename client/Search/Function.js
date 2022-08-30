import { API_BASE_URL } from "../utils/api";
const reservationUrl = new URL(`${API_BASE_URL}/reservations`);

export const handleMobileNumber = (event, setMobileNumber) => {
  event.preventDefault();
  setMobileNumber(event.target.value);
};

export const handleSearch = async (event, setSearchResult, mobileNumber) => {
  event.preventDefault();
  try {
    const data = await fetch(`${reservationUrl}?mobile_number=${mobileNumber}`);
    const result = await data.json();
    setSearchResult(result.data);
  } catch (error) {
    console.log(error);
  }
};

export const undoCancelReservation = (reservation_id) => {
  const cancel = document.getElementById(reservation_id);
  cancel.classList.remove("showCancelAlert");
};

export const confirmCancelReservation = async (reservation_id, history) => {
  try {
    const result2 = await fetch(`${reservationUrl}/${reservation_id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { status: "cancelled" } }),
    });
    history.go(0);
  } catch (error) {
    console.log(error);
  }
};

export const cancelReservation = (reservation_id) => {
  const cancel = document.getElementById(reservation_id);
  cancel.classList.add("showCancelAlert");
};
