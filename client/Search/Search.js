import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    </div>
  );
};

export default Search;
