import { tablesUrl, reservationUrl } from "./api";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";
  
export const handleToday = (loadDashboard) => {
  loadDashboard();
};

export const handlePreviousDay = async (
  previous,
  previousDay,
  setReservations,
  setPreviousDay,
  setNextDay,
  history,
  setDashboardDate
) => {
  const baseUrl = "https://restaurant-77.herokuapp.com/"
  const newPreviousDay = previous(previousDay);
  history.push(`/dashboard?date=${newPreviousDay}`);

  try {
    const result = await fetch(`${baseUrl}reservations?date=${newPreviousDay}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await result.json();
    setReservations(data);
    setPreviousDay(newPreviousDay);
    setNextDay(newPreviousDay);
    setDashboardDate(newPreviousDay);
  } catch (error) {
    console.log(error);
  }
};

export const handleNextDay = async (
  next,
  nextDay,
  setReservations,
  setNextDay,
  setPreviousDay,
  history,
  setDashboardDate
) => {
  const baseUrl = "https://restaurant-77.herokuapp.com/"
  const url = new URL(`${API_BASE_URL}/reservations`);
  const newNextDay = next(nextDay);
  history.push(`/dashboard?date=${newNextDay}`);
  setDashboardDate(newNextDay);

  try {
    let result = await fetch(`${url}?date=${newNextDay}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await result.json();
    setReservations(data);
    setNextDay(newNextDay);
    setPreviousDay(newNextDay);
  } catch (error) {
    console.log(error);
  }
};

export const seatFinish = (tableId) => {
  const finish = document.getElementById(tableId);
  finish.classList.add("showFinishAlert");
};

/** free up the table, and remove the reservation **/
export const confirmSeatFinish = async (tableInfo, history) => {
  const { table_id, reservation_id } = tableInfo;

  try {
    const result = await fetch(`${tablesUrl}/${table_id}/seat`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { reservation_id: null } }),
    });
    const result2 = await fetch(`${reservationUrl}/${reservation_id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { status: "finished" } }),
    });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const cancelSeatFinish = (tableId) => {
  const finish = document.getElementById(tableId);
  finish.classList.remove("showFinishAlert");
};

export const confirmCancelReservation = async (
  reservation_id,
  history,
  loadDashboard
) => {
  try {
    const cancelStatus = await fetch(
      `${reservationUrl}/${reservation_id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { status: "cancelled" } }),
      }
    );

    if (cancelStatus) {
      loadDashboard();
    }
  } catch (error) {
    console.log(error);
  }
};

export const undoCancelReservation = (reservation_id) => {
  const cancel = document.getElementById(reservation_id);
  cancel.classList.remove("showCancelAlert");
};

export const cancelReservation = (reservation_id) => {
  const cancel = document.getElementById(reservation_id);
  cancel.classList.add("showCancelAlert");
};
