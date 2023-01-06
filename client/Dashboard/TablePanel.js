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
      return (
        <tr key={table.table_id}>
          <th scope="row">{table.table_id}</th>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.table_id}>
            {table.reservation_id ? "Occupied" : "Free"}
          </td>
          <td>
            {table.reservation_id && (
              <>
                <button
                  className="btn btn-danger btn-sm"
                  data-table-id-finish={table.table_id}
                  onClick={() => seatFinish(table.table_id, history)}
                >
                  Finish
                </button>

                <div id={table.table_id} className="finishAlert">
                  <h5>
                    Is this table ready to seat new guests? This cannot be
                    undone.
                  </h5>

                  <button onClick={() => confirmSeatFinish(table, history)}>
                    Ok
                  </button>

                  <button onClick={() => cancelSeatFinish(table.table_id)}>
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
