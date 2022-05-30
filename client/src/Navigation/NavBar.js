import React from "react";
import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  ADMINISTRATOR,
  REGULAR,
  OPERATOR,
  COOK,
} from "../Shared/Constants/Roles";
import AdministratorNavList from "./RoleNavLinks/AdministratorNavList";
import LoginNavList from "./RoleNavLinks/LoginNavList";
import { logout } from "../Shared/Redux//auth/authActions.js";
import PropTypes from "prop-types";
import RegularNavList from "./RoleNavLinks/RegularNavList";
import CookNavList from "./RoleNavLinks/CookNavList.js";
import OperatorNavList from "./RoleNavLinks/OperatorNavList";

function NavBar(props) {
  const getNavLinks = () => {
    if (props.user?.roles.map((role) => role.name).includes(REGULAR))
      return <RegularNavList />;
    if (props.user?.roles.map((role) => role.name).includes(ADMINISTRATOR))
      return <AdministratorNavList />;
    if (props.user?.roles.map((role) => role.name).includes(OPERATOR))
      return <OperatorNavList />;
    if (props.user?.roles.map((role) => role.name).includes(COOK))
      return <CookNavList />;
    else return <LoginNavList />;
  };

  const logoutClickHandler = async (e) => {
    e.preventDefault();
    props.logout();
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavbarBrand>VegMe</NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="navbarLinks" />
          <NavbarCollapse id="navbarLinks">
            <Nav className="me-auto">{getNavLinks()}</Nav>

            {props.user && (
              <Nav>
                <NavLink href="#" onClick={logoutClickHandler}>
                  Logout
                </NavLink>
              </Nav>
            )}
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
