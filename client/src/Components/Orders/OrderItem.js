import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { format} from "date-fns"
const OrderItem = ({ order }) => {
  return (
    <div className="item-container">
      <div className="reamrk">{order.remark}</div>
      <div className="address">{order.delivery_address}</div>
      <div className="date">{format(new Date(order.date_ordered), "MMMM dd yyyy")}</div>
    </div>
  );
};

OrderItem.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
