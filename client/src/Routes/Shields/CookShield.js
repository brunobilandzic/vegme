import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { COOK } from '../../Shared/Constants/Roles'
import NotAccessible from './NotAccessible'

export const CookShield = (props) => {
  return (
    <>
      {props.user?.roles.map(r => r.name).includes(COOK) ? (
        props.children
      ) : (
        <NotAccessible />
      )}{" "}
    </>
  )
}

CookShield.propTypes = {

}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CookShield)