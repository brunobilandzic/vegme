import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function RegularNavList() {
  return (
    <>
      <LinkContainer to="/offers">
        <NavLink>Offers</NavLink>
      </LinkContainer>
      <LinkContainer to="/meals">
        <NavLink>Meals</NavLink>
      </LinkContainer>
    </>
  );
}
