import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function OperatorNavLinks() {
  return (
    <>
      <LinkContainer to="/restaurantowners/new">
        <NavLink>New restaurant owner</NavLink>
      </LinkContainer>
    </>
  );
}
