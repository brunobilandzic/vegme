import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Components/Authorization/Login";
import LoginSuccess from "./LoginSuccess";
import OperatorShield from "./Shields/OperatorShield";
import { Container } from "react-bootstrap";
import AdministratorShield from "./Shields/AdministratorShield";
import NewOperator from "../Components/Authorization/NewOperator";
import Signup from "../Components/Authorization/Signup"
import NewMeal from "../Components/Meals/Meals/NewMeal";
import CustomerShield from "./Shields/RegularShield";
import Cart from "../Components//Meals/Cart/Cart";
import RegularShield from "./Shields/RegularShield";
import NewOffer from "../Components/Meals/Offers/NewOffer";
import Offers from "../Components/Meals/Offers/Offers";

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
              path="/meals/new"
              element={
                  <NewMeal />
              }
            ></Route>
            <Route
              path="/offers"
              element={
                <RegularShield>
                  <Offers />
                </RegularShield>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/auth/success" element={<LoginSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route path="/cart" element={<CustomerShield><Cart /></CustomerShield>}></Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}
