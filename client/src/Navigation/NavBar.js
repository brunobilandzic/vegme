import React from 'react'
import { Container, Nav, Navbar, NavbarBrand, NavLink } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import CustomerNavList from './CustomerNavList'
import OperatorNavList from './OperatorNavList'


 function NavBar(props) {
  const getNavLinks = () => {
    return props.user === "customer" ? <CustomerNavList /> : <OperatorNavList />
  }
  return (
    <>
        <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        >
        <Container>
        <LinkContainer to="/">
            <NavbarBrand>VegMe</NavbarBrand>
            </LinkContainer>
            <NavbarToggle aria-controls='navbarLinks' />
            <NavbarCollapse id="navbarLinks">
                <Nav className='me-auto'>
                    {getNavLinks()}
                </Nav>
            </NavbarCollapse>
        </Container>

        </Navbar>
    </>
  )
}


const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {})(NavBar)