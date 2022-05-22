import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";

function App() {
  const [response, setResponse] = useState();
  const testCert = async (e) => {
    const response = await axios.get("https://localhost:5000");
    console.log(response.data);
    setResponse(response.data);
  };
  return (
    <>
      {JSON.stringify(response)}
      <Button onClick={testCert}>Test me</Button>
      <Router navbar={<NavBar />} />
    </>
  );
}

export default App;
