import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../Shared/CustomHooks/form-hook";
import Input from "../../Shared/Form/Input";
import { VALIDATOR_REQUIRED } from "../../util/validators";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {v4 as uuid} from "uuid"
import mealStyles from "./meal.module.css";
import { createMealAction } from "../../Shared/Redux/meals/mealsActions";
import NewIngredient from "./Ingredients/NewIngredient";
import IngredientPreview from "./Ingredients/IngredientPreview";

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
  const getIngredientsPreviewItems = () => 
    ingredients?.map((ingredient) => <IngredientPreview ingredient={ingredient} removeIngredient={removeIngredient} key={uuid()} />)

  const handleMealSubmit = async (e) => {
    e.preventDefault();
    const newMeal = {
      name: formState.inputs.name.value,
      ingredients,
    };
    createMealAction(newMeal);
    setIngredients([])
    clearForm();
  };
  const addIngredient = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };
  const removeIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id != id)
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
