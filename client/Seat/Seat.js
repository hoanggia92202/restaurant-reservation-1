import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

const Seat = () => {
  const [tables, setTables] = useState([]);
  const history = useHistory();
  
  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/dashboard");
  };

  return (
    <form>
      <label htmlFor="table_id">Choose a table:</label>
      <select name="table_id" id="table_id">
        {tables.map((table) => {
          return (
            table.capacity >= people && (
              <option
                id={table.table_id}
                data-capacity={table.capacity}
                data-table_name={table.table_name}
                value={table.table_id}
                key={table.table_id}
              >
                {table.table_name} - {table.capacity}
              </option>
            )
          );
        })}
      </select>
      <br />
      <button
        onClick={(event) => handleSubmit(event)}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
      <button onClick={(e) => handleCancel(e)} className="btn btn-warning">
        Cancel
      </button>
    </form>
  );
};

export default Seat;

