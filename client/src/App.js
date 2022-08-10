import "./App.css";
import { connect } from "react-redux";
import NavBar from "./Navigation/NavBar";
import Router from "./Routes/Router";
import propTypes from "prop-types";
import { loadUser } from "./Redux/auth/authActions.js";
import { useEffect } from "react";
import { COOK } from "./Shared/Constants/Roles";
import CookSocket from "./Socket/CookSocket";

function App({ loadUser, user }) {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {user?.roles.map((role) => role.name).includes(COOK) && (
        <CookSocket userId={user._id} />
      )}
      <Router navbar={<NavBar />} />
    </>
  );
}

App.propTypes = {
  loadUser: propTypes.func.isRequired,
  user: propTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(App);
