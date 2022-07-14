import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { loadAllPersonalrOrders } from '../../../Shared/Api/orders';

export const PickOrder = ({handleBackToCart}) => {
    const [orders, setOrders] = useState([]);
  useEffect(() => {
    const setOrdersAsync = async () => {
        
        setOrders(await loadAllPersonalrOrders())
    }
    setOrdersAsync()
  }, []);
  return <>{orders.length}
  <div>
    <Button variant="danger" onClick={handleBackToCart}>Back to cart</Button>
  </div></>;
}

PickOrder.propTypes = {
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PickOrder)