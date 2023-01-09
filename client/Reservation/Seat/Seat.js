import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Seat = () => {
  const [tables, setTables] = useState([]);
  const history = useHistory();
  const { reservation_id }  = useParams();
  const people = new URLSearchParams(location.search).get("people");

  useEffect(() => {
    loadTables()
  },[])

  const loadTables = async () => {
    try{
      const response = await fetch(`/tables`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if(response.status === 200){
        const { data } = await response.json();
        setTables(() => data);
      }else {
        console.log("Error loading tables: ", response)
      }
    }catch(err){
      console.log("Error: ", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectEl = document.getElementById("tables");
    const table_id = selectEl.value;

    /* update tables and reservations status */
    Promise.all([
      fetch(`/tables/seat`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: {
          table_id: table_id,
          reservation_id: reservation_id
        }})
      }),
      fetch(`/reservations/${reservation_id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { status: "seated" } }),
      })
    ]).then(() => {
      history.push("/dashboard");
    }).catch((err) => {
      console.log("Error: ", err)
    })
  };
  
  const handleCancel = () => {
    history.push("/dashboard");
  };

  return (
    <form>
      <label htmlFor="tables">Choose a table:</label>
      <select name="tables" id="tables">
        {tables.map((table) => {
          return (
            {/* only show empty tables with enough capacity */}
            (table.capacity >= people && table.reservation_id === null) && (
              <option
                id={table.id}
                capacity={table.capacity}
                table_name={table.table_name}
                value={table.id}
                key={table.id}
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
      <button onClick={() => handleCancel()} className="btn btn-warning">
        Cancel
      </button>
    </form>
  );
};

export default Seat;

