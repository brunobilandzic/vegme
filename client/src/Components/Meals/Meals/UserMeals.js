import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import mealStyles from "./meal.module.css";
const UserMeals = (props) => {
  return (
    <div>UserMeals</div>
  )
}

UserMeals.propTypes = {
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserMeals)