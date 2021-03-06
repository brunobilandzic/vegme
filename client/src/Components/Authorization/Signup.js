import React, { useEffect, useState } from "react";
import { useForm } from "../../Shared/CustomHooks/form-hook";
import Input from "../../Shared/Form/Input";
import { Button } from "react-bootstrap";
import {
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_SAME_AS,
} from "../../util/validators";
import { useHttpClient } from "../../Shared/CustomHooks/http-hook.js";
import Modal from "../../Shared/UserInterface/Modal";
import { useNavigate } from "react-router-dom";
export default function Signup() {
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
  const navgate = useNavigate();
  const [sendRequest, error, clearError, setError] = useHttpClient();


  const handleNewCustomerSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", formState.inputs.name.value);
    formData.append("password", formState.inputs.password.value);
    formData.append("username", formState.inputs.username.value);
    const response = await sendRequest(
      process.env.REACT_APP_ROOT_URL + "auth/local/signup",
      "POST",
      formData
    );
    navgate("/auth/success");
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
        />
        <br></br>
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
      <a
        href={`${process.env.REACT_APP_ROOT_URL}/auth/google`}
        target="_blank"
      >
        Authorize with google
      </a>{" "}
      <br />
      <a href="http://localhost:5000/auth/test">Test</a>
    </>
  );
}
