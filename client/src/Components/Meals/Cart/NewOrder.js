import React, { useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import MealList from "../MealList";
import { Button, FormCheck } from "react-bootstrap";
import Modal from "../../../Shared/UserInterface/Modal";
import { sendOrder } from "../../../Redux/orders/ordersActions.js";
import { useForm } from "../../../Shared/CustomHooks/form-hook";
import Input from "../../../Shared/Form/Input";
import { VALIDATOR_REQUIRED } from "../../../util/validators";
import cartStyles from "./cart.module.css";

function NewOrder({ mealsToOrder, sendOrder }) {
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formState, inputHandler, clearForm] = useForm(
    {
      remark: {
        value: "",
        isValid: false,
      },
      deliveryAddress: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleOrderClick = (e) => {
    setShowConfirmOrder(true);
  };

  const handleOrderConfirm = async () => {
    await sendOrder(
      formState.inputs.remark.value,
      formState.inputs.deliveryAddress.value,
    );
    setShowConfirmOrder(false);
    setOrderSuccess(true);
    clearForm();
  };

  const handleOrderCancel = (e) => {
    setShowConfirmOrder(false);
  };

  const handleSuccessClose = () => {
    setOrderSuccess(false);
  };

  return (
    <>
      <Modal
        show={showConfirmOrder}
        content={`You will order ${mealsToOrder?.length} meals. Please confirm that you are sure.`}
        header="Confirm"
        footer={
          <div className="modal-footer-buttons">
            <Button variant="success" onClick={handleOrderConfirm}>
              Confirm
            </Button>
            <Button variant="danger" onClick={handleOrderCancel}>
              Cancel
            </Button>
          </div>
        }
        onCancel={handleOrderCancel}
      ></Modal>
      <Modal
        show={orderSuccess}
        content={`You've successfully made an order!`}
        header="Success"
        footer={
          <div className="modal-footer-buttons">
            <Button variant="success" onClick={handleSuccessClose}>
              Ok
            </Button>
          </div>
        }
        onCancel={handleSuccessClose}
      ></Modal>
          <Input
            element="input"
            type="text"
            id="remark"
            label="Remark"
            placeholder="Please enter your remark"
            onInput={inputHandler}
            value={formState.inputs.remark.value}
          />
          <Input
            element="input"
            type="text"
            id="deliveryAddress"
            label="Delivery Address"
            placeholder="Enter delivery address"
            validators={[VALIDATOR_REQUIRED()]}
            onInput={inputHandler}
            value={formState.inputs.deliveryAddress.value}
          />
          {mealsToOrder.length != 0 ? (
            <MealList meals={mealsToOrder}></MealList>
          ) : (
            <div className="mb-3">Please provide meals</div>
          )}
          <Button
            disabled={!formState.isValid || mealsToOrder.length == 0}
            onClick={handleOrderClick}
          >
            Order
          </Button>
        </>
  );
}

NewOrder.propTypes = {
  mealsToOrder: propTypes.array,
  sendOrder: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mealsToOrder: state.meals.mealsToOrder,
});

export default connect(mapStateToProps, { sendOrder })(NewOrder);
