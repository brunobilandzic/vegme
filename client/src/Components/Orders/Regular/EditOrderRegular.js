import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Form, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { clearOrdersCache } from "../../../Redux/orders/ordersActions";
import { loadSingleCookById } from "../../../Shared/Api/cooks";
import { canEditTime, editOrder } from "../../../Shared/Api/orders";
import { useForm } from "../../../Shared/CustomHooks/form-hook";
import Input from "../../../Shared/Form/Input";
import Modal from "../../../Shared/UserInterface/Modal";
import { capitalizeString, dayOfWeek } from "../../../util/helper";
import ordersStyles from "../orders.module.css";

export const EditOrderRegular = ({ clearOrdersCache }) => {
  const { state } = useLocation();
  const { orderId } = useParams();
  const {
    remark,
    _id,
    delivery_address,
    meals,
    order_time,
    active,
    date_ordered,
  } = state;

  const [formState, inputHandler, clearForm] = useForm(
    {
      remark: {
        value: remark,
        isValid: false,
      },
      deliveryAddress: {
        value: delivery_address,
        isValid: false,
      },
      orderTime: {
        value: order_time,
        isValid: false,
      },
    },
    false
  );

  const [isActive, setIsActive] = useState(active);
  const [editPrompt, setEditPrompt] = useState(false);
  const [allowedOrderTimes, setAllowedOrderTimes] = useState();
  const orderTimeRef = useRef();
  const [timeEditPermit, setTimeEditPermit] = useState(false);
  const [timeEditBanText, setTimeEditBanText] = useState();

  useEffect(() => {
    const loadAllowedOrderTimes = async () => {
      const cookServer = await loadSingleCookById(state.cook._id);
      setAllowedOrderTimes(cookServer.allowed_order_times);
    };

    loadAllowedOrderTimes();
  }, []);

  const onActiveChange = (e) => {
    setIsActive((isActive) => !isActive);
  };

  const cancelEditPrompt = () => {
    setEditPrompt(false);
  };

  const showEditPrompt = () => {
    setEditPrompt(true);
  };

  const handleSelectChange = () => {
    inputHandler(
      orderTimeRef.current.value,
      "orderTime",
      !isNaN(orderTimeRef.current.value)
    );
  };

  const getOptions = () => {
    allowedOrderTimes?.sort();
    return allowedOrderTimes?.map((ot, i) => (
      <option
        key={i}
        selected={ot === formState.inputs.orderTime.value}
        value={ot}
      >
        {capitalizeString(dayOfWeek[ot])}
      </option>
    ));
  };

  const editOrderComp = async () => {
    const editedOrder = {
      _id,
      delivery_address: formState.inputs.deliveryAddress.value,
      remark: formState.inputs.remark.value,
      active: isActive,
      order_time: orderTimeRef.current.value,
    };

    editOrder(editedOrder);
    clearOrdersCache();
    cancelEditPrompt();
  };

  const tryChanges = async () => {
    if (orderTimeRef.current.value != order_time) {
      const { diff, edit_time_allowance } = await canEditTime(_id);
      console.log(diff, edit_time_allowance);
      if (diff < edit_time_allowance) {
        setTimeEditPermit(true);
        setTimeEditBanText(
          <div>
            Only {diff} days between today and order time.
            <br />
            You cannot edit order time now. Minimum number of days between has
            to be {edit_time_allowance}.<br />
            Do you wish to update the other fields, but leave the order time the
            same?
          </div>
        );
      } else {
        editOrderComp();
      }
    } else {
      editOrderComp();
    }
  };

  const editTimePermitClose = () => {
    orderTimeRef.current.value = order_time;
    setTimeEditPermit(false);
    setEditPrompt(false);
  };

  const updateOtherFields = () => {
    editOrderComp();
    orderTimeRef.current.value = order_time;
    setTimeEditPermit(false);
    setEditPrompt(false);
  };

  return (
    <>
      <Modal
        show={editPrompt}
        content={<div>Are you sare you want to edit the order?</div>}
        header="Are you sure"
        footer={
          <ButtonGroup className="modal-footer-buttons">
            <Button variant="success" onClick={tryChanges}>
              Confirm
            </Button>
            <Button variant="danger" onClick={cancelEditPrompt}>
              Cancel
            </Button>
          </ButtonGroup>
        }
      ></Modal>
      <Modal
        show={timeEditPermit}
        content={timeEditBanText}
        header="Cannot edit time"
        footer={
          <ButtonGroup className="modal-footer-buttons">
            <Button variant="success" onClick={updateOtherFields}>
              Update other fields
            </Button>
            <Button variant="danger" onClick={editTimePermitClose}>
              Abort the update
            </Button>
          </ButtonGroup>
        }
      ></Modal>
      <FormGroup>
        <Input
          element="textarea"
          type="text"
          id="remark"
          label="Remark"
          rows={3}
          onInput={inputHandler}
          value={formState.inputs.remark.value}
        />
      </FormGroup>
      <FormGroup className={ordersStyles.deliveryFormGroup}>
        <Input
          element="input"
          label="Delivery address"
          onInput={inputHandler}
          id="deliveryAddress"
          value={formState.inputs.deliveryAddress.value}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Form.Label>Choose delivery time:</Form.Label>
        <Form.Select onChange={handleSelectChange} ref={orderTimeRef}>
        <option default hidden></option>
          {getOptions()}
        </Form.Select>
      </FormGroup>
      <label className={ordersStyles.checkbox}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={onActiveChange}
        ></input>
        &nbsp;Is active?
      </label>
      <br />
      <Button onClick={showEditPrompt}>Edit</Button>
    </>
  );
};

EditOrderRegular.propTypes = {
  clearOrdersCache: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { clearOrdersCache };

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderRegular);
