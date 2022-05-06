import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { useForm } from "./Shared/CustomHooks/form-hook";
import Input from "./Shared/Form/Input";
import { VALIDATOR_REQUIRED } from "./util/validators";
import { Button } from "react-bootstrap";
import { useHttpClient } from "./Shared/CustomHooks/http-hook";
import Modal from "./Shared/UserInterface/Modal";

function NewRestaurant(props) {
  const [sendRequest, error, clearError, setError] = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const handleNewRestaurantSubmit = async e => {
    e.preventDefault()
    if(!props.user) return setError("You must be restaurant owner in order to continue.")
    const formData = new FormData()
    formData.append("name", formState.inputs.name.value)

    const response = await sendRequest("http://localhost:5000/api/restaurants", "POST", formData)
  }

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
      <form onSubmit={handleNewRestaurantSubmit}>
      <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Name"
          id="name"
          label="Name"
          validators={[VALIDATOR_REQUIRED()]}
        /><br></br>
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </>
  );
}

NewRestaurant.propTypes = {
  user: propTypes.object,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(NewRestaurant);
