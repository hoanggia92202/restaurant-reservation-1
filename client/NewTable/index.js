import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import { onChangeHandler, handleCancel, handleSubmit } from "./Functions";

const NewTable = () => {
  const history = useHistory();
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState(0);

  return (
    <Form
      handleSubmit={(event) =>
        handleSubmit(event, tableName, capacity, history)
      }
      onChangeHandler={(event) =>
        onChangeHandler(event, setTableName, setCapacity)
      }
      handleCancel={() => handleCancel(history)}
    />
  );
};

export default NewTable;

