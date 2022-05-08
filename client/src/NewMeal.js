import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useForm } from "./Shared/CustomHooks/form-hook";
import { useHttpClient } from "./Shared/CustomHooks/http-hook";
import Input from "./Shared/Form/Input";
import { loadAllRestaurants } from "./Shared/Redux/actions/restaurants";
import Modal from "./Shared/UserInterface/Modal";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_SAME_AS,
} from "./util/validators";
import propTypes from "prop-types";
import { connect } from "react-redux";
function NewMeal(props) {
  const [selectedRestaurant, setSelectedRestaurant] = useState();
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
  });
  const [sendRequest, error, clearError, setError] = useHttpClient();
  const handleMealSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant) return setError("No restaurant selected.");
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("ingredients", formState.inputs.ingredients.value);
    formData.append("restaurant", selectedRestaurant);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const response = await sendRequest(
      "http://localhost:5000/api/meals",
      "POST",
      formData
    );

    clearForm();
  };
  const logState= () => console.log(formState)
  const selectRestaurantHandler = (e) => {
    setSelectedRestaurant(e.target.value);
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
      <Button onClick={logState}>Log state</Button>
      <form onSubmit={handleMealSubmit}>
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Name"
          id="name"
          label="Name"
          validators={[VALIDATOR_REQUIRED()]}
        ></Input>
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Ingredients"
          id="ingredients"
          label="Ingredients"
          validators={[VALIDATOR_REQUIRED()]}
        ></Input>
        <label>Restaurant</label>
        <FormControl
          as="select"
          defaultValue={0}
          onChange={selectRestaurantHandler}
        >
          <option value="0" hidden={true}>
            Select restaurant
          </option>
          {props.restaurants.length &&
            props.restaurants?.map((r) => (
              <option value={r._id} key={r.id}>
                {r.name}
              </option>
            ))}
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

NewMeal.propTypes = {
  loadAllRestaurants: propTypes.func.isRequired,
  restaurants: propTypes.array,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants.restaurants,
});

export default connect(mapStateToProps, { loadAllRestaurants })(NewMeal);
