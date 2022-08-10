import "./App.css";
import { connect } from "react-redux";
import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";
import propTypes from "prop-types";
import { loadUser } from "./Redux/auth/authActions.js";
import { useEffect } from "react";
import SocketComponent from "./Socket/SocketComponent";

function App({ loadUser }) {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <SocketComponent />
      <Router navbar={<NavBar />} />
    </>
  );
}

App.propTypes = {
  loadUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loadUser })(App);
