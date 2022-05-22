import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";

function App() {
  const [response, setResponse] = useState();
  const testCert = async (e) => {
    console.log(process.env.NODE_ENV)
    const response = await axios.get(process.env.REACT_APP_ROOT_URL);
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
