import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function CustomerNavList() {
  return (
    <>
      <LinkContainer to="/customer/new">
        <NavLink href="/customer/new">Sign up</NavLink>
      </LinkContainer>
    </>
  );
}
