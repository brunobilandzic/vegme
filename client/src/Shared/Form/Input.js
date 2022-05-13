import React, { useEffect, useReducer, useRef, useState } from "react";
import { valid } from "../../util/validators";
import {FaEye, FaEyeSlash} from "react-icons/fa"
import "./Input.css"
const inputHandler = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        value: action.value,
        isValid: valid(action.value, action.validators),
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true,
      };
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputHandler, {
    value: props.value || "",
    isValid: false,
    isTouched: false,
  });

  const { onInput, id } = props;
  const { value, isValid } = inputState;
  const [viewPassword, setViewPassword] = useState(false)

  const handleChange = (e) => {
    dispatch({
      type: "INPUT",
      value: e.target.value,
      validators: props.validators,
    });
    onInput(e.target.value, id, isValid);
  };

  const handleTouch = (e) => {
    dispatch({
      type: "TOUCHED",
    });
  };
  const togglePasswordIcon = () => viewPassword ? <FaEyeSlash /> :<FaEye />
  const passwordRef = useRef()
  const handlePasswordToggleView = () => {
    setViewPassword(prevState => !prevState)
    passwordRef.current.type = passwordRef.current.type === "password" ? "text": "password"
  }
  
  const elementToRender =
    props.element === "input" ? (
      props.type === "password" && props.id != "repeatPassword" ? (
      <div className="password__input d-flex align-items-center">
        <input
        ref={passwordRef}
          className={`form-control ${props.className}`}
          type={props.type}
          id={props.id}
          onChange={handleChange}
          onBlur={handleTouch}
          placeholder={props.placeholder}
          value={inputState.value}
        ></input><div className="togglePassword" onClick={handlePasswordToggleView}>{togglePasswordIcon()} </div>
      
        </div>
      ) : (
        <input
          className={`form-control ${props.className}`}
          type={props.type}
          id={props.id}
          onChange={handleChange}
          onBlur={handleTouch}
          placeholder={props.placeholder}
          value={props.value}
        ></input>
      )
    ) : (
      <textarea
        className={`form-control ${props.className}`}
        id={props.id}
        onChange={handleChange}
        onBlur={handleTouch}
        placeholder={props.placeholder}
        value={inputState.value}
      ></textarea>
    );
  return (
    <div className="form-group">
      <label for={props.id}>{props.label}</label>
      {elementToRender}
    </div>
  );
}
