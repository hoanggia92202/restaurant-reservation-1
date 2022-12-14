import React, { useEffect, useState } from "react";
import "./TablePanel.css";
import { useHistory } from "react-router-dom";

const TablePanel = () => {
  const [tables, setTables] = useState([]);
  const history = useHistory();

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

  return (
    /* list all tables in database */
    tables.length > 0 && tables.map((table) => {
      return (
        <tr key={table.id}>
          <th className="pl-3" scope="row">{table.id}</th>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.id}>
            {table.reservation_id ? "Occupied" : "Free"}
          </td>
          <td>
            {table.reservation_id && (
              <>
                <div
                  className="smallButton finish"
                  data-table-id-finish={table.id}
                  onClick={() => seatFinish(table.id, history)}
                >
                  Finish
                </div>
                <div id={table.id} className="finishAlert">
                  <h5>
                    Is this table ready to seat new guests? This cannot be
                    undone.
                  </h5>
                  <button onClick={() => confirmSeatFinish(table, history)}>
                    Ok
                  </button>
                  <button onClick={() => cancelSeatFinish(table.id)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </td>
        </tr>
      );
    })
  );
};

export default TablePanel;
