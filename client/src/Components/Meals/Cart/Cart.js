import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import MealList from "../MealList";
import { Button, FormCheck } from "react-bootstrap";
import Modal from "../../../Shared/UserInterface/Modal";
import { sendOrder } from "../../../Shared/Redux/orders/ordersActions.js";
import { useForm } from "../../../Shared/CustomHooks/form-hook";
import Input from "../../../Shared/Form/Input";
import { VALIDATOR_REQUIRED } from "../../../util/validators";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import cartStyles from "./cart.module.css";
import { SPECIAL } from "../../../Shared/Constants/MealTypes";
import PickOrder from "./PickOrder";
import NewOrder from "./NewOrder";
function Cart({ mealsToOrder }) {
  const [isAllSpecial, setIsAllSpecial] = useState(false);
  const [allSpecialPrompt, setAllSpecialPrompt] = useState();
  const [pickOrder, setPickOrder] = useState(false);

  useEffect(() => {
    getIsAllSpecial();
  }, []);

  const getIsAllSpecial = () => {
    if (mealsToOrder.length == 0) {
      setIsAllSpecial(false);
      return;
    }
    setAllSpecialPrompt(mealsToOrder.every((meal) => meal.type == SPECIAL));
    setIsAllSpecial(mealsToOrder.every((meal) => meal.type == SPECIAL));
  };

  const handleExistingClick = () => {
    setAllSpecialPrompt(false);
    setPickOrder(true);
  };

  const handleNewOrderClick = () => {
    setAllSpecialPrompt(false);
    setPickOrder(false);
  };

  const handleSpecialClose = () => {
    setPickOrder(false);
  };

  return (
    <>
      <Modal
        show={allSpecialPrompt}
        content={`All meals are special. Do you wish to append them to existing order or create a new one?`}
        header="All special"
        footer={
          <div className="modal-footer-buttons">
            <Button variant="primary" onClick={handleExistingClick}>
              Existing order
            </Button>
            <Button variant="primary" onClick={handleNewOrderClick}>
              New order
            </Button>
          </div>
        }
      />
      {!pickOrder && <NewOrder />}
      {pickOrder && (
        <PickOrder
          handleSpecialClose={handleSpecialClose}
          cookId={mealsToOrder[0]?.cook._id}
          mealsToOrder={mealsToOrder}
        />
      )}
    </>
  );
}

Cart.propTypes = {
  mealsToOrder: propTypes.array,
  sendOrder: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mealsToOrder: state.meals.mealsToOrder,
});

export default connect(mapStateToProps, { sendOrder })(Cart);
