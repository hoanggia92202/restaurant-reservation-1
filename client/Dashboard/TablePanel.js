import React from "react";

const TablePanel = ({
  tables,
  seatFinish,
  confirmSeatFinish,
  cancelSeatFinish,
  history,
}) => {
  return (
    tables &&
    tables.map((table) => {
      console.log("tables", table.id, table.reservation_id)
      return (
        <tr key={table.id}>
          <th scope="row">{table.id}</th>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.id}>
            {table.reservation_id ? "Occupied" : "Free"}
          </td>
          <td>
            {table.reservation_id && (
              <>
                <button
                  className="btn btn-danger btn-sm"
                  data-table-id-finish={table.id}
                  onClick={() => seatFinish(table.id, history)}
                >
                  Finish
                </button>
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
