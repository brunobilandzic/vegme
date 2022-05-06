import React from "react";
import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { ADMINISTRATOR, CUSTOMER, OPERATOR, RESTAURANT_OWNER} from "../Shared/Constants/Roles";
import CustomerNavList from "./CustomerNavList";
import AdministratorNavList from "./AdministratorNavList";
import LoginNavList from "./LoginNavList";
import OperatorNavLinks from "./OperatorNavLinks";
import {logout} from "../Shared/Redux/actions/auth"
import propTypes from "prop-types";
import RestaurantOwnerNavList from "./RestaurantOwnerNavList";
function NavBar(props) {
  const getNavLinks = () => {
    if (props.user?.roleNames.includes(CUSTOMER)) return <CustomerNavList />;
    if (props.user?.roleNames.includes(ADMINISTRATOR))
      return <AdministratorNavList />;
    if (props.user?.roleNames.includes(OPERATOR)) return <OperatorNavLinks />;
    if(props.user?.roleNames.includes(RESTAURANT_OWNER)) return <RestaurantOwnerNavList />
    else return <LoginNavList />;
  };

  const logoutClickHandler = async (e) => {
    console.log("in logout comp")
    e.preventDefault()
   props.logout()
  }
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
                  <NavLink href="#" onClick={logoutClickHandler}>Logout</NavLink>
              </Nav>
            )}
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
NavBar.propTypes = {
  logout: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {logout})(NavBar);
