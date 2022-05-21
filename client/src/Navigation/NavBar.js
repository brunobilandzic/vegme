import React from "react";
import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  ADMINISTRATOR,
  CUSTOMER,
  OPERATOR,
  RESTAURANT_OWNER,
} from "../Shared/Constants/Roles";
import CustomerNavList from "./RoleNavLinks/CustomerNavList";
import AdministratorNavList from "./RoleNavLinks/AdministratorNavList";
import LoginNavList from "./RoleNavLinks/LoginNavList";
import OperatorNavLinks from "./RoleNavLinks/OperatorNavLinks";
import { logout } from "../Shared/Redux/actions/auth";
import PropTypes from "prop-types";
import RestaurantOwnerNavList from "./RoleNavLinks/RestaurantOwnerNavList";
function NavBar(props) {
  const getNavLinks = () => {
    if (props.user?.roleNames.includes(CUSTOMER)) return <CustomerNavList />;
    if (props.user?.roleNames.includes(ADMINISTRATOR))
      return <AdministratorNavList />;
    if (props.user?.roleNames.includes(OPERATOR)) return <OperatorNavLinks />;
    if (props.user?.roleNames.includes(RESTAURANT_OWNER))
      return <RestaurantOwnerNavList />;
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
            <Nav className="me-auto">
              {getNavLinks()}
              <LinkContainer to="/restaurantslist">
                <NavLink>Restaurant List</NavLink>
              </LinkContainer>
            </Nav>

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
