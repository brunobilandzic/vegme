import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";

import Login from "../Login";
import LoginSuccess from "./LoginSuccess";
import NewCustomer from "../NewCustomer";
import NewRestaurantOwner from "../NewRestaurantOwner";
import CustomerShield from "./CustomerShield";
import OperatorShield from "./OperatorShield";
import { Container } from "react-bootstrap";
import AdministratorShield from "./AdministratorShield";
import NewOperator from "../NewOperator";

function Router(props) {
  return (
    <>
      <BrowserRouter>
      {props.navbar}
        <Container>
          <Routes>
          <Route path="/operators/new" element={
            <AdministratorShield>
              <NewOperator />
            </AdministratorShield>
          }>

          </Route>
            <Route
              path="/customer/new"
              element={
                <CustomerShield>
                  <NewCustomer />
                </CustomerShield>
              }
            ></Route>
            <Route
              path="/restaurantowners/new"
              element={
                <OperatorShield>
                  <NewRestaurantOwner />
                </OperatorShield>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<NewCustomer />}></Route>
            <Route path="/auth/success" element={<LoginSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
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
