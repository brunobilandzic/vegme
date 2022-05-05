import React from "react";
import { NavLink } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

export default function OperatorNavList() {
  return (
    <>
      <LinkContainer to="restaurantowner/new">
        <NavLink>New restaurannt owner</NavLink>
      </LinkContainer>
    </>
  );
}
