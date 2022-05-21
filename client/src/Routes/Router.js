import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Components/Authorization/Login";
import LoginSuccess from "./LoginSuccess";
import NewRestaurantOwner from "../Components/Authorization/NewRestaurantOwner";
import OperatorShield from "./Shields/OperatorShield";
import { Container } from "react-bootstrap";
import AdministratorShield from "./Shields/AdministratorShield";
import NewOperator from "../Components/Authorization/NewOperator";
import Signup from "../Components/Authorization/Signup";
import NewRestaurant from "../Components/Restaurant/NewRestaurant";
import RestaurantList from "../Components/Restaurant/RestaurantList";
import RestaurantOwnerShield from "./Shields/RestaurantOwnerShield";
import NewMeal from "../Components/Meals/NewMeal";
import RestaurantSingular from "../Components/Restaurant/RestaurantSingular";
import CustomerShield from "./Shields/CustomerShield";
import Cart from "../Components/Cart/Cart";

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
            <Route
              path="/meals/new"
              element={
                <RestaurantOwnerShield>
                  <NewMeal />
                </RestaurantOwnerShield>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/auth/success" element={<LoginSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route path="/restaurantslist" element={<RestaurantList />}></Route>
            <Route path="/restaurant/:restaurantId" element={<RestaurantSingular />}></Route>
            <Route path="/cart" element={<CustomerShield><Cart /></CustomerShield>}></Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}
