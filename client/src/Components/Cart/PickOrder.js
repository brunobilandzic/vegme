import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  appendMealsToOrder,
  loadAllPersonalOrders,
} from "../../Shared/Api/orders";
import { Form } from "react-bootstrap";
import MealList from "../Meals/MealList";
import { clearOrdersCache, emptyTheCart } from "../../Redux/orders/ordersActions";
import Modal from "../../Shared/UserInterface/Modal";
export const PickOrder = ({
  handleSpecialClose,
  cookId,
  mealsToOrder,
  clearOrdersCache,
  emptyTheCart
}) => {
  const [orders, setOrders] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const orderId = useRef();
  useEffect(() => {
    const setOrdersAsync = async () => {
      setOrders(
        await loadAllPersonalOrders(
          cookId,
          mealsToOrder.map((meal) => meal._id)
        )
      );
    };
    setOrdersAsync();
  }, []);

  const getOptions = () => {
    return orders?.map((order, i) => (
      <option key={i} value={order._id}>
        {order.remark}
      </option>
    ));
  };

  const onAddMealsToOrder = async () => {
    await appendMealsToOrder(
      orderId.current.value,
      mealsToOrder?.map((meal) => meal._id)
    );
    setOrderSuccess(true);
    clearOrdersCache();
    emptyTheCart()
    
  };

  const handleSuccessClose = () => {
    setOrderSuccess(false);
    handleSpecialClose();
  };

  return (
    <>
      <Modal
        show={orderSuccess}
        content={`You've successfully appedend meals to order!`}
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
      <div>
        <div>
          {mealsToOrder.length != 0 ? (
            <MealList meals={mealsToOrder}></MealList>
          ) : (
            <div className="mb-3">Please provide meals</div>
          )}
        </div>
        <div>
          {orders?.length != 0 ? (
            <Form.Select ref={orderId}>
              <option default hidden>
                Choose Order
              </option>
              {getOptions()}
            </Form.Select>
          ) : (
            <div>
              No orders, either you have no order for this cook or you have one
              meal in some order.
            </div>
          )}
        </div>
      </div>
      <div>
        <Button variant="success" onClick={onAddMealsToOrder}>
          Add
        </Button>
        <Button variant="danger" onClick={handleSpecialClose}>
          New order
        </Button>
      </div>
    </>
  );
};

PickOrder.propTypes = {
  emptyTheCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  clearOrdersCache,
  emptyTheCart
};

export default connect(mapStateToProps, mapDispatchToProps)(PickOrder);
