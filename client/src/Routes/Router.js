import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "../Components/Authorization/Login";
import OperatorShield from "./Shields/OperatorShield";
import AdministratorShield from "./Shields/AdministratorShield";
import NewOperator from "../Components/Authorization/NewOperator";
import Signup from "../Components/Authorization/Signup";
import NewMeal from "../Components/Meals/Cook/NewMeal";
import Cart from "../Components/Cart/Cart";
import RegularShield from "./Shields/RegularShield";
import MealsMainPage from "../Components/Meals/MealsMainPage";
import BrowseMeals from "../Components/Meals/Render/BrowseMeals";
import CookShield from "./Shields/CookShield";
import UsernamePrompt from "../Components/Authorization/UsernamePrompt";
import AuthSuccess from "../Components/Authorization/AuthSuccess";
import GoogleAuthSuccess from "../Components/Authorization/GoogleAuthSuccess";
import BrowseOrders from "../Components/Orders/Render/BrowseOrders";
import MainPage from "../Shared/Components/MainPage";
import AuthorizationShield from "./Shields/AuthorizationShield";
import OrderPage from "../Components/Orders/OrderPage";
import CookMeals from "../Components/Meals/Cook/CookMeals";
import CookProfile from "../Components/Cook/CookProfile";
import BrowseCooks from "../Components/Cook/Render/BrowseCooks";
import BrowseSpecialMeals from "../Components/Meals/Render/BrowseSpecialMeals";
import RegularOrCookShield from "./Shields/RegularOrCookShield";
import Alerts from "../Components/Alerts/Alerts";
import EditOrderRegular from "../Components/Orders/Regular/EditOrderRegular";
import MealMainPage from "../Components/Meals/MealMainPage";
import FavouritesMainPage from "../Components/Meals/Favourites/FavouritesMainPage";
import BrowseRegulars from "../Components/Regulars/Render/BrowseRegulars";
import RegularsMainPage from "../Components/Regulars/RegularsMainPage";

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
              path="/meals/special"
              element={<BrowseSpecialMeals />}
            ></Route>
            <Route path="/meals/:mealId" element={<MealMainPage />} />
            <Route
              path="/orders/my"
              element={
                <RegularShield>
                  <BrowseOrders />
                </RegularShield>
              }
            ></Route>
            <Route
              path="/order/:orderId"
              element={
                <RegularOrCookShield>
                  <OrderPage />
                </RegularOrCookShield>
              }
            ></Route>
            <Route
              path="/order/edit"
              element={
                <RegularOrCookShield>
                  <EditOrderRegular />
                </RegularOrCookShield>
              }
            ></Route>
            <Route path="/cooks" element={<BrowseCooks />} />
            <Route path="/cooks/:username" element={<CookProfile />}></Route>
            <Route
              path="/favourites/:username"
              element={<FavouritesMainPage />}
            ></Route>
            <Route path="/regulars" element={<RegularsMainPage />} />
            <Route path="/regulars/browse" element={<BrowseRegulars />} />
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
            <Route
              path="/alerts"
              element={
                <AuthorizationShield>
                  <Alerts />
                </AuthorizationShield>
              }
            />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/" element={<MainPage />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}
