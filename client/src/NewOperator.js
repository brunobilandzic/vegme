import React, { useEffect, useRef, useState } from "react";
import { OPERATOR } from "./Shared/Constants/Roles";
import { useForm } from "./Shared/CustomHooks/form-hook";
import { useHttpClient } from "./Shared/CustomHooks/http-hook";
import { Button } from "react-bootstrap";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_SAME_AS,
} from "./util/validators";
import Input from "./Shared/Form/Input";
import Modal from "./Shared/UserInterface/Modal";
export default function NewOperator() {
  const [formState, inputHandler, clearForm] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
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

  const handleNewOperatorSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", formState.inputs.name.value);
    formData.append("username", formState.inputs.username.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("role", OPERATOR);
    const response = await sendRequest(
      "http://localhost:5000/api/operators",
      "POST",
      formData
    );

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

      <form onSubmit={handleNewOperatorSubmit}>
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
          className="password__input"
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
        /><br></br>
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </>
  );
}
