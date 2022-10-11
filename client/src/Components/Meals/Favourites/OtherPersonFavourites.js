import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const OtherPersonFavourites = (props) => {
  return (
    <div>OtherPersonFavourites</div>
  )
}

OtherPersonFavourites.propTypes = {
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OtherPersonFavourites)