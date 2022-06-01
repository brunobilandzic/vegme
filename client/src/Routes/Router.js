import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Login from "../Components/Authorization/Login";
import OperatorShield from "./Shields/OperatorShield";
import AdministratorShield from "./Shields/AdministratorShield";
import NewOperator from "../Components/Authorization/NewOperator";
import Signup from "../Components/Authorization/Signup";
import NewMeal from "../Components/Meals/NewMeal";
import CustomerShield from "./Shields/RegularShield";
import Cart from "../Components//Meals/Cart/Cart";
import RegularShield from "./Shields/RegularShield";
import NewOffer from "../Components/Meals/Offers/NewOffer";
import Offers from "../Components/Meals/Offers/Offers";
import UserMeals from "../Components/Meals/UserMeals";
import MealsMainPage from "../Components/Meals/MealsMainPage";
import BrowseMeals from "../Components/Meals/BrowseMeals";
import UserOrders from "../Components/Meals/Offers/UserOrders";
import CookShield from "./Shields/CookShield";
import UsernamePrompt from "../Components/Authorization/UsernamePrompt";
import AuthSuccess from "../Components/Authorization/AuthSuccess";
import GoogleAuthSuccess from "../Components/Authorization/GoogleAuthSuccess";
import BrowseOrders from "../Components/Orders/BrowseOrders";

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
            <Route path="/meals" element={<MealsMainPage />}></Route>
            <Route
              path="/meals/new"
              element={
                <CookShield>
                  <NewMeal />
                </CookShield>
              }
            ></Route>
            <Route path="/meals/browse" element={<BrowseMeals />}></Route>
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
              path="/orders/my"
              element={
                <RegularShield>
                  <BrowseOrders />
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
            <Route path="/auth/success" element={<AuthSuccess />}></Route>
            <Route path="/auth/failure">Failed to log in</Route>
            <Route
              path="/auth/google/username"
              element={<UsernamePrompt />}
            ></Route>
            <Route
              path="/auth/google/success"
              element={<GoogleAuthSuccess />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}
