import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { loadAllPersonalOrders } from "../../../Shared/Api/orders";
import { Form } from "react-bootstrap";
export const PickOrder = ({ handleBackToCart, cookId }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const setOrdersAsync = async () => {
      setOrders(await loadAllPersonalOrders(cookId));
    };
    setOrdersAsync();
  }, []);

  const getOptions = () => {
    return orders.map((order) => (
      <option value={order._id}>{order.remark}</option>
    ));
  };
  return (
    <>
      <div>
        <div>
          <Form.Select>
            <option disabled hidden>Choose Order</option>
            {getOptions()}
          </Form.Select>
        </div>
      </div>
      <div>
        <Button variant="danger" onClick={handleBackToCart}>
          Back to cart
        </Button>
      </div>
    </>
  );
};

PickOrder.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PickOrder);
