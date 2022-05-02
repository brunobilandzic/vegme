import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";

import Login from "../Login";
import NewCustomer from "../NewCustomer";
import NewRestaurantOwner from "../NewRestaurantOwner";
import CustomerShield from "./CustomerShield";
import OperatorShield from "./OperatorShield";
import { Button } from "react-bootstrap";
import axios from "axios";

const LoginSuccess = () => {
  const [result, setResult] = useState(null);

  const checkAuth = async () => {
    const response = await axios.get("http://localhost:5000/auth/test", {
      withCredentials: true,
    })
    console.log(response.data);
    setResult(response.data);

  };

  return (
    <>
      <p>Logged in</p>
      <Button onClick={checkAuth}>Check</Button>
      {JSON.stringify(result)}
    </>
  );
};

function Router(props) {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/customer/new"
              element={
                <CustomerShield>
                  <NewCustomer />
                </CustomerShield>
              }
            ></Route>
            <Route
              path="/restaurantowner/new"
              element={
                <OperatorShield>
                  {" "}
                  <NewRestaurantOwner />
                </OperatorShield>
              }
            ></Route>
            <Route path="/auth/success" element={<LoginSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

Router.propTypes = {
  user: propTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Router);
