import React from "react";
import { useForm } from "./Shared/CustomHooks/form-hook";
import Input from "./Shared/Form/Input";
import { VALIDATOR_MIN_LENGTH, VALIDATOR_REQUIRED } from "./util/validators";

export default function Login() {
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
  return (
    <>
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
    </>
  );
}
