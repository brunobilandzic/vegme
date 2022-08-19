import React from "react";
import { NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertNavItem from "./AlertNavItem";

export default function CookNavList(props) {
  return (
    <>
      <LinkContainer to="/meals">
        <NavLink>Meals</NavLink>
      </LinkContainer>
      <AlertNavItem />
    </>
  );
}
