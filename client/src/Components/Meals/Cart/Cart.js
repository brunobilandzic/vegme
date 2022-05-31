import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import MealList from "../Meals/MealList";
import { Button } from "react-bootstrap";
import Modal from "../../../Shared/UserInterface/Modal";
function Cart({ orderedMeals }) {
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const handleOrderClick = (e) => {
    setShowConfirmOrder(true)
  };
  const handleOrderConfirm = (e) => {};
  const handleOrderCancel = (e) => {
    setShowConfirmOrder(false)
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
      <MealList meals={orderedMeals}></MealList>
      <Button onClick={handleOrderClick}>Order</Button>
    </>
  );
}

Cart.propTypes = {
  orderedMeals: propTypes.array,
};

const mapStateToProps = (state) => ({
  orderedMeals: state.cart.orderedMeals,
});

export default connect(mapStateToProps, {})(Cart);
