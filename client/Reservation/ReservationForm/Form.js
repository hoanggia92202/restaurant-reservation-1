import React from "react";

const Form = ({
  onChangeHandler,
  handleSubmit,
  handleCancel,
  firstName = "",
  lastName = "",
  mobileNumber = "",
  people = "",
  reservationDate = "",
  reservationTime = "",
}) => {
  return (
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
  );
};

export default Form;
