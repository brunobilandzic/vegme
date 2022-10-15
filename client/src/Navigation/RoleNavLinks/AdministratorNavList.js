import React from "react";
import { NavLink } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import AlertNavItem from "../../Components/Alerts/AlertNavItem";

export default function AdministratorNavList() {
  return (
    <>
      <LinkContainer to="operators/new">
        <NavLink>New operator</NavLink>
      </LinkContainer>
      <LinkContainer to="/regulars">
        <NavLink>Regulars</NavLink>
      </LinkContainer>
      <AlertNavItem />
    </>
  );
}
