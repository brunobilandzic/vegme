import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import offerStyles from "./offer.module.css";

const UserOrders = (props) => {
  return (
    <div>UserOrders</div>
  )
}

UserOrders.propTypes = {
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)