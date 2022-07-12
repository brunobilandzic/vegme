import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "../Components/Authorization/Login";
import OperatorShield from "./Shields/OperatorShield";
import AdministratorShield from "./Shields/AdministratorShield";
import NewOperator from "../Components/Authorization/NewOperator";
import Signup from "../Components/Authorization/Signup";
import NewMeal from "../Components/Meals/NewMeal";
import Cart from "../Components//Meals/Cart/Cart";
import RegularShield from "./Shields/RegularShield";
import MealsMainPage from "../Components/Meals/MealsMainPage";
import BrowseMeals from "../Components/Meals/BrowseMeals";
import CookShield from "./Shields/CookShield";
import UsernamePrompt from "../Components/Authorization/UsernamePrompt";
import AuthSuccess from "../Components/Authorization/AuthSuccess";
import GoogleAuthSuccess from "../Components/Authorization/GoogleAuthSuccess";
import BrowseOrders from "../Components/Orders/BrowseOrders";
import MainPage from "../Shared/Components/MainPage";
import AuthorizationShield from "./Shields/AuthorizationShield";
import OrderPage from "../Components/Orders/OrderPage";
import CookMeals from "../Components/Meals/CookMeals";
import CookProfile from "../Components/Cook/CookProfile";
import BrowseCooks from "../Components/Cook/BrowseCooks";

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
                <CookShield>
                  <CookMeals />
                </CookShield>
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
              path="/order"
              element={
                <RegularShield>
                  <OrderPage />
                </RegularShield>
              }
            ></Route>
            <Route path="/cooks" element={<BrowseCooks />} />
            <Route path="/cooks/:username" element={<CookProfile />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/auth/success"
              element={
                <AuthorizationShield>
                  <AuthSuccess />
                </AuthorizationShield>
              }
            ></Route>
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
            <Route path="/" element={<MainPage />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}
