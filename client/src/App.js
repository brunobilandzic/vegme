import "./App.css";
import { connect } from "react-redux";
import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";
import propTypes from "prop-types";
import { loadUser } from "./Redux/auth/authActions.js";
import { useEffect } from "react";
import SocketComponent from "./Socket/SocketComponent";
import { setUneradAlertsCount } from "./Redux/alerts/alertsActions";
import { isStaticDemo } from "./Demo/catalog";
import DemoNavigation from "./Demo/DemoNavigation";
import demoStyles from "./Demo/demoLayout.module.css";

function LiveApp({ loadUser, user , setUneradAlertsCount}) {
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

LiveApp.propTypes = {
  loadUser: propTypes.func.isRequired,
  setUneradAlertsCount: propTypes.func.isRequired,
  user: propTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const ConnectedLiveApp = connect(mapStateToProps, {
  loadUser,
  setUneradAlertsCount,
})(LiveApp);

export default function App() {
  return isStaticDemo ? (
    <div className={demoStyles.shell}>
      <Router navbar={<DemoNavigation />} />
    </div>
  ) : <ConnectedLiveApp />;
}
