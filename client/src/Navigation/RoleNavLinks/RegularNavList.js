import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertNavItem from "./AlertNavItem";

export default function RegularNavList() {
  return (
    <>
      <LinkContainer to="/meals">
        <NavLink>Meals</NavLink>
      </LinkContainer>
      <LinkContainer to="/cart">
        <NavLink>Cart</NavLink>
      </LinkContainer>
      <LinkContainer to="/orders/my">
        <NavLink>Orders</NavLink>
      </LinkContainer>
      <LinkContainer to="/cooks">
        <NavLink>Cooks</NavLink>
      </LinkContainer>
      <AlertNavItem />
    </>
  );
}
