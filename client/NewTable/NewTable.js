import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NewTable = () => {
  const history = useHistory();
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const table = {
      table_name: tableName,
      capacity: capacity,
    };
  
    console.log("NewTable: ", table);
  };

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case "table_name":
        setTableName(event.target.value);
        break;
      case "capacity":
        setCapacity(event.target.value);
        break;
      default:
    }
  };

  const handleCancel = () => {
    history.goBack();
  };
  
  return (
    <form
      className="h6 p-3 m-auto pt-5 w-50 "
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-group">
        <label htmlFor="table_name">Table Name</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="table_name"
          type="text"
          minLength="2"
          className="form-control"
          id="table_name"
          placeholder="table_name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input
          onChange={(event) => onChangeHandler(event)}
          name="capacity"
          type="number"
          min="1"
          className="form-control"
          id="capacity"
          placeholder="capacity"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mb-2">
        Submit
      </button>
      <button onClick={() => handleCancel()} className="btn btn-warning w-100">
        Cancel
      </button>
    </form>
  );
}

export default NewTable;

