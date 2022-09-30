import { createReservation, updateReservation } from "./api";

const year = new Date().getFullYear();
const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
const day = new Date().getDate().toString().padStart(2, "0");
const date = year + "-" + month + "-" + day;

const reservationIsAllowed = (reservationDate, reservationTime) => {
  if (
    reservationDate >= date &&
    new Date(reservationDate).getDay() !== 1 &&
    reservationTime > "10:30" &&
    reservationTime < "21:30"
  ) {
    return true;
  }
  return false;
};

export const handleCancel = (history) => {
  history.push("/dashboard");
};

export const onChangeHandler = (
  event,
  setFirstName,
  setLastName,
  setMobileNumber,
  setPeople,
  setReservationDate,
  setReservationTime
) => {
  switch (event.target.name) {
    case "first_name":
      setFirstName(event.target.value);
      break;
    case "last_name":
      setLastName(event.target.value);
      break;
    case "mobile_number":
      setMobileNumber(event.target.value);
      break;
    case "reservation_date":
      setReservationDate(event.target.value);
      break;
    case "reservation_time":
      setReservationTime(event.target.value);
      break;
    case "people":
      setPeople(event.target.value);
      break;
    default:
  }
};

export const handleSubmit = async (
  event,
  firstName,
  lastName,
  mobileNumber,
  people,
  reservationDate,
  reservationTime,
  reservationID,
  setIsTuesday,
  setIsPastDate,
  setBeforeHours,
  setAfterHours,
  isUpdate,
  history
) => {
  event.preventDefault();
  setIsTuesday(false);
  setIsPastDate(false);
  setBeforeHours(false);
  setAfterHours(false);

  if (reservationTime < "10:30") {
    setBeforeHours(true);
  }
  if (reservationTime > "21:30") {
    setAfterHours(true);
  }
  if (reservationDate < date) {
    setIsPastDate(true);
  }
  if (new Date(reservationDate).getDay() === 1) {
    setIsTuesday(true);
  }

  if (reservationIsAllowed(reservationDate, reservationTime)) {
    let reservation = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      people: Number(people),
    };
    const response = isUpdate
      ? updateReservation(reservation, reservationID)
      : createReservation(reservation);

    if (response) {
      history.goBack();
    }
  }
};
