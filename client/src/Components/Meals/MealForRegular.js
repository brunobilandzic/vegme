import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const MealForRegular = (props) => {
  return (
    <div>MealForRegular</div>
  )
}

MealForRegular.propTypes = {

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MealForRegular)