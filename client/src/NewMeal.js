import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useForm } from "./Shared/CustomHooks/form-hook";
import { useHttpClient } from "./Shared/CustomHooks/http-hook";
import Input from "./Shared/Form/Input";
import { loadAllRestaurants } from "./Shared/Redux/actions/restaurants";
import Modal from "./Shared/UserInterface/Modal";
import {
  VALIDATOR_REQUIRED
} from "./util/validators";
import propTypes from "prop-types";
import { connect } from "react-redux";
function NewMeal(props) {
  const selectRestaurant = useRef()
  useEffect(() => {
    props.loadAllRestaurants();
  }, []);
  const [formState, inputHandler, clearForm] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    ingredients: {
      value: "",
      isValid: false,
    },
    restaurant: {
      value: "",
      isValid: false
    }
  }, false);
  const [sendRequest, error, clearError, setError] = useHttpClient();
  const handleMealSubmit = async (e) => {
    e.preventDefault();
   
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("ingredients", formState.inputs.ingredients.value);
    formData.append("restaurant", formState.inputs.restaurant.value);

    const response = await sendRequest(
      "http://localhost:5000/api/meals",
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
        <label>Restaurant</label>
        <FormControl
          as="select"
          defaultValue={0}
          onChange={selectRestaurantHandler}
          ref={selectRestaurant}
        >
          <option value="0" hidden={true}>
            Select restaurant
          </option>
          
          {props.restaurants?.length &&
            props.restaurants?.map((r) => (
              <option value={r._id} key={r._id}>
                {r.name}
              </option>
            ))}
        </FormControl>
        <Button type="submit" disabled={!formState.isValid}>Submit</Button>
      </form>
    </>
  );
}

NewMeal.propTypes = {
  loadAllRestaurants: propTypes.func.isRequired,
  allRestaurants: propTypes.array,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants.restaurants.all,
});

export default connect(mapStateToProps, { loadAllRestaurants })(NewMeal);
