import React from 'react'
import { NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function LoginNavList() {
  return (
    <>
      <LinkContainer to="/login">
        <NavLink>Login</NavLink>
      </LinkContainer>
    </>
  )
}
