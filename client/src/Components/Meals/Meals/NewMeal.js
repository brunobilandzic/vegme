import React, {useRef} from "react";
import { Button } from "react-bootstrap";
import { useForm } from "../../../Shared/CustomHooks/form-hook";
import { useHttpClient } from "../../../Shared/CustomHooks/http-hook";
import Input from "../../../Shared/Form/Input";
import Modal from "../../../Shared/UserInterface/Modal";
import {
  VALIDATOR_REQUIRED
} from "../../../util/validators";
import propTypes from "prop-types";
import { connect } from "react-redux";
import mealStyles from "./meal.module.css";
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

    const response = await sendRequest(
      process.env.REACT_APP_ROOT_URL + "meals",
      "POST",
      formData
    );

    clearForm();
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
        <Button type="submit" disabled={!formState.isValid}>Submit</Button>
      </form>
    </>
  );
}

NewMeal.propTypes = {
};

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, {  })(NewMeal);
