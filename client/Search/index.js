import React, { useState } from "react";
import Form from "./Form";
import RenderSearchResult from "./RenderSearchResult";
import { handleMobileNumber, handleSearch } from "./Function";
import "./Search.css";

const Search = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="container alert-primary p-4">
      <Form
        handleMobileNumber={(event) =>
          handleMobileNumber(event, setMobileNumber)
        }
        handleSearch={(event) =>
          handleSearch(event, setSearchResult, mobileNumber)
        }
        mobileNumber={mobileNumber}
      />
      {searchResult.length > 0 ? (
        <RenderSearchResult searchResult={searchResult} />
      ) : (
        <div className="h4 text-center">No reservations found</div>
      )}
    </div>
  );
};

export default Search;
