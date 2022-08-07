import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import ordersStyles from "./orders.module.css";
import { AiFillDelete } from "react-icons/ai";
import Modal from "../../Shared/UserInterface/Modal";
import { Button } from "react-bootstrap";
import { clearOrdersCache } from "../../Redux/orders/ordersActions";

export const MealInOrder = ({
  meal,
  removeMeal,
  clearOrdersCache
}) => {
  const [removalPrompt, setRemovalPrompt] = useState(false);

  const getIngredientsString = (ingredients) => {
    let ingredientsString = "";
    ingredients?.forEach((ingredient, index) => {
      ingredientsString +=
        index != ingredients.length - 1
          ? ` ${ingredient.name}  ${
              ingredient.allergen ? "allegen" : "not allergen"
            },`
          : ` ${ingredient.name} ${
              ingredient.allergen ? "allegen" : "not allergen"
            }`;
    });
    return ingredientsString;
  };

  const comfirmMealRemovalHandler = () => {
    removeMeal(meal._id);
    setRemovalPrompt(false);
    clearOrdersCache()
  };

  return (
    <>
      <ConfirmMealRemoval
        cancelRemovalPrompt={() => {
          setRemovalPrompt(false);
        }}
        comfirmMealRemoval={comfirmMealRemovalHandler}
        removalPrompt={removalPrompt}
      />
      <div className={`${ordersStyles.mealItem} d-flex`}>
        <div className={ordersStyles.mealName}>{meal.name}</div>
        <div>{meal.type}</div>
        <div>{getIngredientsString(meal.ingredients)}</div>
        <div className="clickable-icon" onClick={() => setRemovalPrompt(true)}>
          <AiFillDelete />
        </div>
      </div>
    </>
  );
};

const ConfirmMealRemoval = function ({
  removalPrompt,
  cancelRemovalPrompt,
  comfirmMealRemoval,
}) {
  return (
    <Modal
      show={removalPrompt}
      header="Confirm"
      content={`Do you wish to remove this meal from order?`}
      footer={
        <div className="modal-footer-buttons">
          <Button variant="success" onClick={comfirmMealRemoval}>
            Confirm
          </Button>
          <Button variant="danger" onClick={cancelRemovalPrompt}>
            Cancel
          </Button>
        </div>
      }
    />
  );
};

MealInOrder.propTypes = {
  clearOrdersCache: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { clearOrdersCache };

export default connect(mapStateToProps, mapDispatchToProps)(MealInOrder);
