import React, { useEffect, useRef } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useForm } from "../../../Shared/CustomHooks/form-hook";
import { useHttpClient } from "../../../Shared/CustomHooks/http-hook";
import Input from "../../../Shared/Form/Input";
import Modal from "../../../Shared/UserInterface/Modal";
import {
  VALIDATOR_REQUIRED
} from "../../../util/validators";
import propTypes from "prop-types";
import { connect } from "react-redux";
function NewMeal(props) {
  const selectRestaurant = useRef()
  const [formState, inputHandler, clearForm] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    ingredients: {
      value: "",
      isValid: false,
    }
  }, false);
  const [sendRequest, error, clearError, setError] = useHttpClient();
  const handleMealSubmit = async (e) => {
    e.preventDefault();
   
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("ingredients", formState.inputs.ingredients.value);

    const response = await sendRequest(
      process.env.REACT_APP_ROOT_URL + "api/meals",
      "POST",
      formData
    );

    clearForm();
    selectRestaurant.current.value = 0
  };
  const selectRestaurantHandler = (e) => {
    inputHandler(e.target.value, "restaurant", true)
  };


  return (
    <>
      <Modal
        show={error}
        content={error}
        header="Error"
        footer={
          <Button variant="warning" onClick={clearError}>
            Cancel
          </Button>
        }
        onCancel={clearError}
      ></Modal>
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
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Ingredients"
          id="ingredients"
          label="Ingredients"
          value={formState.inputs.ingredients.value}
          validators={[VALIDATOR_REQUIRED()]}
        ></Input>
        <Button type="submit" disabled={!formState.isValid}>Submit</Button>
      </form>
    </>
  );
}

NewMeal.propTypes = {
  allRestaurants: propTypes.array,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants.restaurants.all,
});

export default connect(mapStateToProps, {  })(NewMeal);
