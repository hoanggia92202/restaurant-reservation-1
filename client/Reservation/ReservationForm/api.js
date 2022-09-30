import { API_BASE_URL } from "../../utils/api";
const url = new URL(`${API_BASE_URL}/reservations`);

export const createReservation = async (reservation) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: reservation }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateReservation = async (reservation, reservationID) => {
  try {
    const response = await fetch(`${url}/${reservationID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: reservation }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
