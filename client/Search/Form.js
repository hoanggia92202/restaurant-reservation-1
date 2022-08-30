import React from "react";

const Form = ({ handleMobileNumber, handleSearch, mobileNumber }) => {
  return (
    <div>
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
    </div>
  );
};

export default Form;
