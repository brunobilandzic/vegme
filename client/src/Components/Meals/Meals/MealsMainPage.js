import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import mealStyles from "./meal.module.css";

const MealsMainPage = (props) => {
  return (
    <>
        <Link to="/meals/new">New meal</Link>
        <br></br>
        <Link to="/mymeals">My meals</Link>
        <br />
        <Link to="/meals/browse">Browse</Link>
    </>
  )
}

MealsMainPage.propTypes = {
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MealsMainPage)