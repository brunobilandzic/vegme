import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function RegularNavList() {
  return (
    <>
      <LinkContainer to="/meals">
        <NavLink>Meals</NavLink>
      </LinkContainer>
      <LinkContainer to="/cart">
        <NavLink>Cart</NavLink>
      </LinkContainer>
    </>
  );
}
