import React, {useEffect, useState} from "react";
import "./App.css";

function App() {

  const [connectStatus,setConnectStatus] = useState("connecting...");
  useEffect(() => {
    connect()
  },[]);

  async function connect() {
    try{
      const response = await fetch("/test");
      if(response.status === 200){
        const data = await response.json();
        setConnectStatus(data.message);
        console.log("res", data.message)
      }
    }catch(error){
      console.log("Error: ", error)
    }
  }

  return (
   <>
    <h1 className="App">Welcome to React</h1>
    <h4>{connectStatus}</h4>
   </>
  );
}

export default App;
