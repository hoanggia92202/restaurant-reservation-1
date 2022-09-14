import { API_BASE_URL } from "../utils/api";

export const onChangeHandler = (event, setTableName, setCapacity) => {
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

export const handleSubmit = async (event, tableName, capacity, history) => {
  event.preventDefault();
  const url = new URL(`${API_BASE_URL}/tables`);

  let table = {
    table_name: tableName,
    capacity: capacity,
  };

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: table }),
    });

    if (result) {
      history.push("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCancel = (history) => {
  history.goBack();
};
