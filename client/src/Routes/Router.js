import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "../Login";
import LoginSuccess from "./LoginSuccess";
import NewRestaurantOwner from "../NewRestaurantOwner";
import OperatorShield from "./OperatorShield";
import { Container } from "react-bootstrap";
import AdministratorShield from "./AdministratorShield";
import NewOperator from "../NewOperator";
import Signup from "../Signup";
import NewRestaurant from "../NewRestaurant";
import RestaurantOwnerShield from "./RestaurantOwnerShield";

export default function Router(props) {
  return (
    <>
      <BrowserRouter>
        {props.navbar}
        <Container>
          <Routes>
            <Route
              path="/operators/new"
              element={
                <AdministratorShield>
                  <NewOperator />
                </AdministratorShield>
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
            <Route
              path="/restaurants/new"
              element={
                <RestaurantOwnerShield>
                  <NewRestaurant />
                </RestaurantOwnerShield>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/auth/success" element={<LoginSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}


