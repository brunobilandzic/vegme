import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import ordersStyles from "./orders.module.css";
export const EditOrderRegular = (props) => {
  const { state } = useLocation();
  const { remark, delivery_address, meals, order_time, active, date_ordered } =
    state;

  const [isRemarkTouched, setIsRemarkTouched] = useState(false);
  const [remarkValue, setRemarkValue] = useState(remark);
  const [isDeliveryTouched, setIsDeliveryTouched] = useState(false);
  const [deliveryValue, setDeliveryValue] = useState(delivery_address);
  const [isActive, setIsActive] = useState(active);
  const isActiveRef = useRef()

  const onRemarkFirstClick = () => {
    if (isRemarkTouched) return;
    setIsRemarkTouched(true);
    setRemarkValue(remark);
  };

  const onDeliveryFirstClick = () => {
    if (isDeliveryTouched) return;
    setIsDeliveryTouched(true);
    setDeliveryValue(delivery_address);
  };

  const onRemarkChange = (e) => {
    setRemarkValue(e.target.value);
  };
  const deliveryChange = (e) => {
    setDeliveryValue(e.target.value);
  };

  const onActiveChange = (e) => {
    setIsActive(isActive => !isActive)
  }

  return (
    <>
      <FormGroup>
        <label>Remark:</label>
        <textarea
          className={ordersStyles.remarkTextarea}
          onClick={onRemarkFirstClick}
          value={remarkValue}
          placeholder={remark}
          onChange={onRemarkChange}
        ></textarea>
      </FormGroup>
      <div className={ordersStyles.deliveryFormGroup}>
        <label>Delivery Address:</label>
        <input
          className={ordersStyles.deliveryInput}
          onClick={onDeliveryFirstClick}
          value={deliveryValue}
          placeholder={delivery_address}
          onChange={deliveryChange}
        ></input>
      </div>
      <label className={ordersStyles.checkbox}>
        <input type="checkbox" ref={isActiveRef} checked={isActive} onChange={onActiveChange}></input>&nbsp;Is active?
      </label>
    </>
  );
};

EditOrderRegular.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderRegular);
