import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import ordersStyles from "../orders.module.css";
import { capitalizeString, dayOfWeek } from "../../../util/helper";
const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const navigateToSingular = () => {
    navigate(`/order/${order._id}`);
  };
  return (
    <div
      onClick={navigateToSingular}
      className={`item-box hover`}
    >
      <div className={`d-flex`}>
        <div>Remark:&nbsp;</div>
        <div>{order.remark}</div>
      </div>

      <div className={`d-flex`}>
        <div>Delivery:&nbsp;</div>
        <div>{capitalizeString(dayOfWeek[order.order_time])} </div>
      </div>

      <div className={`d-flex`}>
        <div>Address:&nbsp; </div>
        <div>{order.delivery_address}</div>
      </div>
      <div className={`d-flex`}>
        <div>Cook:&nbsp;</div>
        <div>{order.cook?.username || order.cook.user?.username}</div>
      </div>
      <div>
        {order.meals?.length} {order.meals?.length == 1 ? "meal" : "meals"}
      </div>
      <div className={`d-flex`}>
        <div>Date:&nbsp;</div>
        <div>{format(new Date(order.date_ordered), "MM/dd/yy, hh:mmaa")}</div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
