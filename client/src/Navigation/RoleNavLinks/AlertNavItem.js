import React from "react";
import { NavLink } from "react-bootstrap";
import { AiFillBell } from "react-icons/ai";
import { LinkContainer } from "react-router-bootstrap";

export default function AlertNavItem() {
  return (
    <>
      <LinkContainer to="/alerts">
        <NavLink>
          <div className="alert-nav-link">
            <AiFillBell></AiFillBell>
          </div>
        </NavLink>
      </LinkContainer>
    </>
  );
}
