import React from "react";
import { NavLink } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

export default function AdministratorNavList() {
  return (
    <>
      <LinkContainer to="operators/new">
        <NavLink>New operator</NavLink>
      </LinkContainer>
    </>
  );
}
