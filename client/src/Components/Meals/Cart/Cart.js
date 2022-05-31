import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import MealList from "../Meals/MealList";
import { Button, Form, FormCheck } from "react-bootstrap";
import Modal from "../../../Shared/UserInterface/Modal";
import { sendOrder } from "../../../Shared/Redux/cart/cartActions";
import { useForm } from "../../../Shared/CustomHooks/form-hook";
import Input from "../../../Shared/Form/Input";
import { VALIDATOR_REQUIRED } from "../../../util/validators";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import cartStyles from "./cart.module.css";
function Cart({ orderedMeals, sendOrder }) {
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  let [isActive, setIsActive] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      remark: {
        value: "",
        isValid: true,
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
  const handleOrderConfirm = (e) => {
    sendOrder(
      formState.inputs.remark.value,
      formState.inputs.deliveryAddress.value,
      isActive
    );
    setShowConfirmOrder(false)
  };
  const handleOrderCancel = (e) => {
    setShowConfirmOrder(false);
  };

  const handleActiveCheck = () => {
    setIsActive((prevActive) => !prevActive);
  };
  return (
    <>
      <Modal
        show={showConfirmOrder}
        content={`You will order ${orderedMeals?.length} meals. Please confirm that you are sure.`}
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

      <div>Cart</div>

      <Input
        element="input"
        type="text"
        id="remark"
        label="Remark"
        placeholder="Please enter your remark"
        onInput={inputHandler}
      />
      <Input
        element="input"
        type="text"
        id="deliveryAddress"
        label="Delivery Address"
        placeholder="Enter delivery address"
        validators={[VALIDATOR_REQUIRED()]}
        onInput={inputHandler}
      />
      <div className={cartStyles.activeCheckboxContainer}>
        <FormCheckLabel>Active</FormCheckLabel>
        <FormCheck onChange={handleActiveCheck} checked={isActive}></FormCheck>
      </div>

      <MealList meals={orderedMeals}></MealList>
      <Button disabled={!formState.isValid} onClick={handleOrderClick}>
        Order
      </Button>
    </>
  );
}

Cart.propTypes = {
  orderedMeals: propTypes.array,
  sendOrder: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orderedMeals: state.cart.orderedMeals,
});

export default connect(mapStateToProps, { sendOrder })(Cart);
