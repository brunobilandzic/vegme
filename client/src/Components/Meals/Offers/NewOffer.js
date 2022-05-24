import React from 'react'
import { connect } from 'react-redux'
import propTypes from "prop-types"
import offerStyles from "./offer.module.css";
function NewOffer() {
  return (
    <div>NewOffer</div>
  )
}

NewOffer.propTypes = {
    
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(NewOffer)