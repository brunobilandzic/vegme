import React, { useState } from "react";
import { useForm } from "./Shared/CustomHooks/form-hook";
import { useHttpClient } from "./Shared/CustomHooks/http-hook";
import { Button } from "react-bootstrap";
import Input from "./Shared/Form/Input";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_SAME_AS,
} from "./util/validators";
import Modal from "./Shared/UserInterface/Modal";
export default function NewRestaurantOwner() {
  const [response, setResponse] = useState();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      repeatPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [sendRequest, error, clearError, setError] = useHttpClient();

  const handleNewCustomerSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", formState.inputs.name.value);
    formData.append("username", formState.inputs.username.value);
    formData.append("email", formState.inputs.email.value);
    formData.append("password", formState.inputs.password.value);

    const response = await sendRequest(
      "http://localhost:5000/api/restaurantowner",
      "POST",
      formData
    );
    console.log(response);
    setResponse(response);
  };
  return (
    <>

      <form onSubmit={handleNewCustomerSubmit}>
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Name"
          id="name"
          label="Name"
          validators={[VALIDATOR_REQUIRED()]}
        />
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Username"
          id="username"
          label="Username"
          validators={[VALIDATOR_REQUIRED()]}
        />
        <Input
          onInput={inputHandler}
          element="input"
          type="email"
          placeholder="Email"
          label="Email"
          id="email"
          validators={[VALIDATOR_EMAIL()]}
        />
        <Input
          onInput={inputHandler}
          element="input"
          type="password"
          label="Password"
          placeholder="Password"
          id="password"
          validators={[VALIDATOR_MIN_LENGTH(6)]}
        />
        <Input
          onInput={inputHandler}
          element="input"
          type="password"
          label="Repeat Password"
          placeholder="Repeat Password"
          id="repeatPassword"
          validators={[VALIDATOR_SAME_AS(formState.inputs.password?.value)]}
        />
        <br></br>
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </>
  );
}
