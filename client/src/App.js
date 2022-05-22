import "./App.css";

import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";

function App() {
  return (
    <>
      <Router navbar={<NavBar />} />
    </>
  );
}

export default App;
