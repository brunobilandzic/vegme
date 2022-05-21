import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function CustomerNavList() {
  return (
    <>
      <LinkContainer to="/cart">
        <NavLink>Cart</NavLink>
      </LinkContainer>
    </>
  );
}
