import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { handleCancel, onChangeHandler, handleSubmit } from "./Functions";
import Form from "./Form";

import {
  TuesdayAlert,
  PastDateAlert,
  BeforeHoursMessage,
  AfterHoursMessage,
} from "./AlertMessage";

const NewReservation = ({ customerInfo = {} }) => {
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

  const history = useHistory();

  useEffect(() => {
    if (Object.keys(customerInfo).length > 0) {
      setFirstName(customerInfo.firstName);
      setLastName(customerInfo.lastName);
      setMobileNumber(customerInfo.mobileNumber);
      setPeople(customerInfo.people);
      setReservationDate(customerInfo.reservationDate);
      setReservationTime(customerInfo.reservationTime);
      setReservationID(customerInfo.reservation_id);
      setIsUpdate(true);
    }
  }, [
    customerInfo.firstName,
    customerInfo.lastName,
    customerInfo.mobileNumber,
    customerInfo.people,
    customerInfo.reservationDate,
    customerInfo.reservationTime,
    customerInfo.reservation_id,
  ]);

  return (
    <>
      {isTuesday && TuesdayAlert}
      {isPastDate && PastDateAlert}
      {beforeHours && BeforeHoursMessage}
      {afterHours && AfterHoursMessage}
      <Form
        onChangeHandler={(event) =>
          onChangeHandler(
            event,
            setFirstName,
            setLastName,
            setMobileNumber,
            setPeople,
            setReservationDate,
            setReservationTime
          )
        }
        handleSubmit={(event) =>
          handleSubmit(
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
          )
        }
        handleCancel={() => handleCancel(history)}
        firstName={firstName}
        lastName={lastName}
        mobileNumber={mobileNumber}
        people={people}
        reservationDate={reservationDate}
        reservationTime={reservationTime}
      />
    </>
  );
};

export default NewReservation;
