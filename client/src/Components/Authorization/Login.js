import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "../../Shared/UserInterface/Modal.js";
import { useForm } from "../../Shared/CustomHooks/form-hook";
import { useHttpClient } from "../../Shared/CustomHooks/http-hook";
import Input from "../../Shared/Form/Input";
import { VALIDATOR_MIN_LENGTH, VALIDATOR_NO_SPACE, VALIDATOR_REQUIRED } from "../../util/validators";

export default function Login() {
  const [sendRequest, error, clearError, setError] = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const onLogin = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("credentials", formState.inputs.username.value);
    formData.append("password", formState.inputs.password.value);

    const response = await sendRequest(
      process.env.REACT_APP_ROOT_URL + "auth/local/login",
      "POST",
      formData
    );

    if (!error) navigate("/auth/success");
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

      <form onSubmit={onLogin}>
        <Input
          onInput={inputHandler}
          element="input"
          type="text"
          placeholder="Username"
          id="username"
          label="Username"
          validators={[VALIDATOR_NO_SPACE(), VALIDATOR_MIN_LENGTH(6)]}_
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
        <a href={`${process.env.REACT_APP_ROOT_URL}auth/google`} target="_blank">
          Authorize with google
        </a><br></br>
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </>
  );
}
