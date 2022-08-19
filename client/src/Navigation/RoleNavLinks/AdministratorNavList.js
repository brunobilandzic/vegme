import React from "react";
import { NavLink } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import AlertNavItem from "./AlertNavItem";

export default function AdministratorNavList() {
  return (
    <>
      <LinkContainer to="operators/new">
        <NavLink>New operator</NavLink>
      </LinkContainer>
      <AlertNavItem />
    </>
  );
}
