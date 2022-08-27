import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../Shared/CustomHooks/form-hook";
import Input from "../../Shared/Form/Input";
import { VALIDATOR_REQUIRED } from "../../util/validators";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import mealStyles from "./meal.module.css";
import { createMealAction } from "../../Redux/meals/mealsActions";
import NewIngredient from "./Ingredients/NewIngredient";
import IngredientPreview from "./Ingredients/IngredientPreview";
import { REGULAR, SPECIAL } from "../../Shared/Constants/MealTypes";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import Modal from "../../Shared/UserInterface/Modal";

function NewMeal({ createMealAction }) {
  const [formState, inputHandler, clearForm] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState(REGULAR);
  const [success, setSuccess] = useState(false)

  const getIngredientsPreviewItems = () =>
    ingredients?.map((ingredient) => (
      <IngredientPreview
        ingredient={ingredient}
        removeIngredient={removeIngredient}
        key={uuid()}
      />
    ));

  const handleMealSubmit = async (e) => {
    e.preventDefault();
    const newMeal = {
      name: formState.inputs.name.value,
      ingredients,
      type
    };
    createMealAction(newMeal);
    setIngredients([]);
    clearForm();
    setSuccess(true)
  };

  const addIngredient = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const removeIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id != id)
    );
  };

  const changeType = () => {
    setType((oldType) => (oldType == REGULAR ? SPECIAL : REGULAR));
  };

  const getTypePromptIcons = () => {
    return (
      <>
      <Modal
        show={success}
        content={`You've successfully made an meal!`}
        header="Success"
        footer={
          <div className="modal-footer-buttons">
            <Button variant="success" onClick={() => setSuccess(false)}>
              Ok
            </Button>
          </div>
        }
        onCancel={() => setSuccess(false)}
      ></Modal>
        <div className={`${mealStyles.type} ${mealStyles.regularOption}`} onClick={changeType}>
          Regular{" "}
          {type == REGULAR ? (
            <MdOutlineRadioButtonChecked />
          ) : (
            <MdOutlineRadioButtonUnchecked />
          )}
        </div>
        
        <div className={mealStyles.type} onClick={changeType}>
          {type == SPECIAL ? (
            <MdOutlineRadioButtonChecked />
          ) : (
            <MdOutlineRadioButtonUnchecked />
          )}{" "}
          Special
        </div>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleMealSubmit}>
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Name"
          id="name"
          label="Name"
          value={formState.inputs.name.value}
          validators={[VALIDATOR_REQUIRED()]}
        ></Input>
        <div className={mealStyles.typePrompt}>{getTypePromptIcons()}</div>
        {getIngredientsPreviewItems()}
        <NewIngredient addIngredient={addIngredient} />
        <br />
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </>
  );
}

NewMeal.propTypes = {
  createMealAction: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createMealAction })(NewMeal);
