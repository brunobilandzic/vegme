import "./App.css";
import { connect } from "react-redux";
import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";
import propTypes from "prop-types";
import { loadUser } from "./Redux/auth/authActions.js";
import { useEffect } from "react";
import SocketComponent from "./Socket/SocketComponent";
import { setUneradAlertsCount } from "./Redux/alerts/alertsActions";

function App({ loadUser, user , setUneradAlertsCount}) {
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setUneradAlertsCount()
  }, [user])

  return (
    <>
      <SocketComponent />
      <Router navbar={<NavBar />} />
    </>
  );
}

App.propTypes = {
  loadUser: propTypes.func.isRequired,
  setUneradAlertsCount: propTypes.func.isRequired,
  user: propTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, setUneradAlertsCount })(App);
