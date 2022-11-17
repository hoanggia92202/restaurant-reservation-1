import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  TuesdayAlert,
  PastDateAlert,
  BeforeHoursMessage,
  AfterHoursMessage,
} from "./AlertMessage";

const ReservationForm = ({ customerInfo = {} }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationID, setReservationID] = useState("");
  const [people, setPeople] = useState(0);

  const [isTuesday, setIsTuesday] = useState(false);
  const [isPastDate, setIsPastDate] = useState(false);
  const [beforeHours, setBeforeHours] = useState(false);
  const [afterHours, setAfterHours] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day = new Date().getDate().toString().padStart(2, "0");
  const date = year + "-" + month + "-" + day;

  const history = useHistory();

  useEffect(() => {
    if (Object.keys(customerInfo).length > 0) {
      console.log("form", customerInfo)
      setFirstName(customerInfo.first_name || "");
      setLastName(customerInfo.last_name || "");
      setMobileNumber(customerInfo.mobile_number || "");
      setPeople(customerInfo.people || "");
      setReservationDate(customerInfo.reservation_date || "");
      setReservationTime(customerInfo.reservation_time || "");
      setReservationID(customerInfo.id || "");
      setIsUpdate(true);
    }
  }, [
    customerInfo.firstName,
    customerInfo.lastName,
    customerInfo.mobileNumber,
    customerInfo.people,
    customerInfo.reservationDate,
    customerInfo.reservationTime,
    customerInfo.id,
  ]);
  

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

  const createReservation = async (reservation) => {
        const response = await fetch("/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: reservation }),
        });
  };

  const updateReservation = async (reservation, reservationID) => {
    const response = await fetch(`/reservations/${reservationID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: reservation }),
    });
  };

  const handleSubmit = async (event) => {
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
      
      history.push('/dashboard');
    }
  };

  const handleCancel = () => {
    history.push("/dashboard");
  };

  const onChangeHandler = (event) => {
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
  
  return (
    <>
      {isTuesday && TuesdayAlert}
      {isPastDate && PastDateAlert}
      {beforeHours && BeforeHoursMessage}
      {afterHours && AfterHoursMessage}
      <form className="h6 p-3 w-50 m-auto">
      <div className="form-group">
        <label htmlFor="first_name">First name</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="first_name"
          type="text"
          className="form-control"
          id="first_name"
          placeholder="First name"
          value={firstName}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last name</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="last_name"
          type="text"
          className="form-control"
          id="last_name"
          placeholder="Last name"
          value={lastName}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile number</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="mobile_number"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className="form-control"
          id="mobile_numbere"
          placeholder="123-555-5555"
          value={mobileNumber}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Date</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="reservation_date"
          type="date"
          className="form-control"
          id="reservation_date"
          placeholder="Date"
          value={reservationDate}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Time</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="reservation_time"
          type="time"
          className="form-control"
          id="reservation_time"
          placeholder="Time"
          value={reservationTime}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="people">People</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="people"
          type="number"
          className="form-control"
          id="people"
          placeholder="minimum 1 person"
          value={people}
          min="1"
          required
        />
      </div>
      <button
        onClick={(event) => handleSubmit(event)}
        type="submit"
        className="btn btn-primary w-100 mb-2"
      >
        Submit
      </button>
      <button onClick={() => handleCancel()} className="btn btn-warning w-100">
        Cancel
      </button>
    </form>
    </>
  );
};

export default ReservationForm;
