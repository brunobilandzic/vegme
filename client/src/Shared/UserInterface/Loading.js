import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const Loading = ({isLoading}) => {
  return (
    <>
        {isLoading && <div className='loading-wrap'>Loading ...</div>}
    </>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isLoading: state.api.isLoading
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)