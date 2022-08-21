import React, {useEffect, useState} from "react";
import "./App.css";

function App() {

  const [connectStatus, setConnectStatus] = useState("connecting...");
  useEffect(() => {
    connect()
  },[]);

  /** This function is use to test connection when deploy on Heroku. **/
  /** It should display "Connnect to backend successful..." **/
  async function connect() {
    try{
      console.log("process env: ", process.env.NODE_ENV);
      const response = await fetch("/test");
      if(response.status === 200){
        const data = await response.json();
        setConnectStatus(data.message);
      }
    }catch(error){
      console.log("Error: ", error)
    }
  }

  return (
   <>
    <h1 className="App">Welcome to React 78</h1>
    <h4>{connectStatus}</h4>
   </>
  );
}

export default App;
