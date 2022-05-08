import React from 'react'
import { NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function RestaurantOwnerNavList() {
  return (
      <>
          <LinkContainer to="/restaurants/new">
              <NavLink>New restaurant</NavLink>
          </LinkContainer>
          <LinkContainer to="/meals/new">
              <NavLink>New meal</NavLink>
          </LinkContainer>
      </>
  )
}
