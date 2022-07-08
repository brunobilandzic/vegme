import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isInCookRole } from '../Authorization/Roles/isInRole';
import mealStyles from "./meal.module.css";

const MealsMainPage = ({user}) => {
  return (
    <>
        <Link to="/meals/browse">Browse</Link>
        { 
          isInCookRole(user) && <div>
            <Link to="/mymeals">My Meals</Link>
            <br />
            <Link to="/meals/new">New Meal</Link>
          </div>
        }
    </>
  )
}

MealsMainPage.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MealsMainPage)