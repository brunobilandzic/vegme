import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MainPage = ({user}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) navigate("/login")
    }, [])
  return (
    <>
        { <div>Main Page</div>}
    </>
  )
}

MainPage.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)