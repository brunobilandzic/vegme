import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Login from "../Components/Authorization/Login";
import LoginSuccess from "./LoginSuccess";
import OperatorShield from "./Shields/OperatorShield";
import AdministratorShield from "./Shields/AdministratorShield";
import NewOperator from "../Components/Authorization/NewOperator";
import Signup from "../Components/Authorization/Signup";
import NewMeal from "../Components/Meals/Meals/NewMeal";
import CustomerShield from "./Shields/RegularShield";
import Cart from "../Components//Meals/Cart/Cart";
import RegularShield from "./Shields/RegularShield";
import NewOffer from "../Components/Meals/Offers/NewOffer";
import Offers from "../Components/Meals/Offers/Offers";
import UserMeals from "../Components/Meals/Meals/UserMeals";
import MealsMainPage from "../Components/Meals/Meals/MealsMainPage";
import BrowseMeals from "../Components/Meals/Meals/BrowseMeals";
import UserOrders from "../Components/Meals/Offers/UserOrders";

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
              path="/meals"
              element={
                <MealsMainPage />
              }
            ></Route>
            <Route
              path="/meals/new"
              element={
                <RegularShield>
                  <NewMeal />
                </RegularShield>
              }
            ></Route>
            <Route
              path="/meals/browse"
              element={
                  <BrowseMeals />
              }
            ></Route>
            <Route
              path="/mymeals"
              element={
                <RegularShield>
                  <UserMeals />
                </RegularShield>
              }
            ></Route>
            <Route
path="/orders"
              element={
                <RegularShield>
                  <UserOrders />
                </RegularShield>
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
            <Route
              path="/offers/new"
              element={
                <RegularShield>
                  <NewOffer />
                </RegularShield>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/auth/success" element={<LoginSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route
              path="/cart"
              element={
                <CustomerShield>
                  <Cart />
                </CustomerShield>
              }
            ></Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}
