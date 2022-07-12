import React, { useEffect } from "react";
import Input from "../../Shared/Form/Input.js";
import {
  VALIDATOR_MIN_LENGTH,
  VALIDATOR_NO_SPACE,
} from "../../util/validators.js";
import { Button } from "react-bootstrap";
import { useForm } from "../../Shared/CustomHooks/form-hook.js";
import { useHttpClient } from "../../Shared/CustomHooks/http-hook.js";
import { useNavigate } from "react-router-dom";

export default function UsernamePrompt(props) {
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isVaid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const [sendRequest, error, clearError, setError] = useHttpClient();


  const usernameSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", formState.inputs.username.value);
    const response = await sendRequest(
      process.env.REACT_APP_ROOT_URL + "/users/username/new",
      "POST",
      formData
    );

    if (!error) navigate("/auth/google/success");
  };

  
  return (
    <>
      <form onSubmit={usernameSubmitHandler}>
        <div className="form-box third-party-auth-username-prompt">
          <h3 className="form-header">Please enter your username</h3>
          <Input
            element="input"
            type="text"
            id="username"
            label="Username"
            placeholder="Username"
            onInput={inputHandler}
            validators={[VALIDATOR_NO_SPACE(), VALIDATOR_MIN_LENGTH(6)]}
          ></Input>
          <div className="form-button-container">
            <Button disabled={!formState.isValid} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
