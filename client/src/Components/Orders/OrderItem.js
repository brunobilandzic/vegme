import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import ordersStyles from "./orders.module.css";
const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const navigateToSingular = () => {
    navigate("/order", { state: { ...order } });
  };
  return (
    <div onClick={navigateToSingular} className={ordersStyles.container}>
      <div className={`${ordersStyles.remark} ${ordersStyles.box}`}>
        <div className={ordersStyles.remarkHeading}>Remark:&nbsp;</div>
        <div className={ordersStyles.remarkContent}>{order.remark}</div>
      </div>
      <div className={`${ordersStyles.address} ${ordersStyles.box}`}>
        <div className={ordersStyles.addressHeading}>Address:&nbsp; </div>
        <div className={ordersStyles.addressContent}>
          {" "}{order.delivery_address}
        </div>
      </div>
      <div className={`${ordersStyles.cook} ${ordersStyles.box}`}>
        <div className={ordersStyles.cookHeading}>Cook:&nbsp;</div>
        <div className={ordersStyles.cookContent}>
          {order.cook.user.username}
        </div>
      </div>
      <div>
        {order.meals?.length} {order.meals?.length == 1 ? "meal" : "meals"}
      </div>
      <div className={`${ordersStyles.date} ${ordersStyles.box}`}>
        <div className={ordersStyles.dateHeading}>Date:</div>
        <div className={ordersStyles.dateContent}>
          {format(new Date(order.date_ordered), "MM/dd/yy, hh:mmaa")}
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
